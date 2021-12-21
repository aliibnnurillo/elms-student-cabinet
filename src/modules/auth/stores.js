import { action, autorun, computed, observable, runInAction } from "mobx";
import {
  rmToken,
  setToken,
  validToken,
  saveUser,
  getActiveSemester,
  isExistUser,
  getUser,
  getToken,
} from "common/utils/utils";
import { client } from "common/utils/request";
import { storage, http, history } from "services";

import { API_URL, CURRENT_LANG, API_BASE_URL } from "../../constants";
import flash from "stores/Flash";
import Axios from "axios";
import config from "config";
import * as Api from "./api";
import _ from "lodash";

const accessToken = storage.local.get(config.api.access_token_key) || "";

const refreshToken = storage.local.get(config.api.refresh_token_key) || "";

const initialProfile = {
  activeStudy: { academic_year_id: 0, season_semester: "autumn_semester" },
  academic_year_id: 0,
  season_semester: "autumn_semester",
  department_name: "",
  email: "",
  file_url_photo: "",
  fio: "",
  id: 0,
  language: "oz",
  university_name: "",
  university_id: 0,
  username: "",
};

class AuthStore {
  @observable authenticated = !!accessToken;
  @observable isFetched = !accessToken;

  @observable user = isExistUser() ? getUser() : {};
  @observable accessToken = accessToken;
  @observable refreshToken = refreshToken;
  @observable state = "";
  @observable error = null;
  @observable activeSemesterId = 0;
  @observable profile = initialProfile;

  @computed
  get auth() {
    if (this.authenticated) {
      return true;
    }
    return validToken();
  }

  @action
  changeLang = async (lang = "") => {
    this.state = "pending";
    this.reset();
    try {
      const res = await client.post("/profile/change-lang", {
        default_language: lang,
      });

      const { status } = res;

      if (status === 200) {
        await this.reloadProfileInfo();
        window.location.reload();
      }
      return res;
    } catch (error) {
      this.state = "error";

      return error.response;
    }
  };

  @action
  login = async (credentials) => {
    this.state = "pending";
    this.reset();
    try {
      const res = await Axios.post(API_URL + "/auth/login", credentials);

      const { data = {} } = res;

      const isFirstTimeLogin = !!_.get(data, "result.first_time_login");

      if (!isFirstTimeLogin) {
        const accessToken = _.get(data, "result.access_token") || "";
        runInAction(() => {
          this.accessToken = accessToken;
          this.authenticated = true;
          this.state = "done";
          this.error = null;
          this.isFetched = true;
        });
        setToken(accessToken);
      } else {
        storage.local.set(
          config.api.temp_access_token_key,
          _.get(data, "result.access_token")
        );
      }
      return { isFirstTimeLogin };
    } catch (error) {
      this.state = "error";

      if (error.response) {
        if (error.response.status === 401) {
          const _res = _.get(error, "response.data");
          runInAction(() => {
            this.error = _res;
          });
        }
      } else flash.setFlash("error", "Error occurred!");

      return error.response;
    }
  };

  @observable activeSemSeason = "";
  @observable activeAcademicYear = 0;

  @action
  Profile = async () => {
    this.isFetched = false;
    try {
      const { data } = await Api.Profile({ language: CURRENT_LANG });

      const result = _.get(data, "result.0");
      this.setUserData(result);
      runInAction(() => {
        this.profile = result;
        this.activeSemSeason =
          _.get(result, "activeStudy.season_semester") || "";
        this.activeAcademicYear =
          Number(_.get(result, "activeStudy.academic_year_id")) || 0;
        this.activeSemesterId =
          Number(_.get(result, "activeStudy.semester_id")) || 0;
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          storage.local.remove(config.api.access_token_key);
          storage.local.remove(config.api.refresh_token_key);
          runInAction(() => {
            this.authenticated = false;
            this.profile = initialProfile;
            this.accessToken = "";
            this.refreshToken = "";
            this.error = null;
            this.state = "";
          });
        }
      }
    } finally {
      runInAction(() => {
        this.isFetched = true;
      });
    }
  };

  @action
  reloadProfileInfo = async () => {
    this.state = "pending";
    try {
      const res = await client.get("/profile/show", {
        params: { language: CURRENT_LANG },
      });

      const { status, data } = res;

      if (status === 200) {
        if (Array.isArray(data.result) && data.result.length) {
          this.setUser(data.result[0]);
          saveUser({
            id: data.result[0].id,
            username: data.result[0].username,
            email: data.result[0].email,
            avatar: data.result[0].file_url_photo,
            default_language: data.result[0].default_language,
            phone: data.result[0].phone,
          });
        }
      }
    } catch (error) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  @action
  saveNewEmail = async (credentials, form) => {
    this.state = "pending";

    try {
      const res = await Axios.put(API_BASE_URL + `/email`, credentials, {
        headers: {
          Authorization:
            "Bearer " + storage.local.get(config.api.temp_access_token_key),
        },
      });

      const { status, data } = res;

      if (status === 200) {
        console.log("attach email -> ", data);
      }

      return res;
    } catch (error) {
      this.state = "error";

      if (error.response) {
        if (error.response.status === 422) {
          const _res = error.response.data.message
            ? error.response.data.message
            : {};
          form.setFields([
            {
              name: "email",
              value: credentials.email,
              errors: _res.email,
            },
          ]);
        }
      } else flash.setFlash("error", "Error occured!");

      return error.response;
    }
  };

  @action
  fetchActiveSemester = async (loginData) => {
    return Axios.get(API_BASE_URL + "/syllabus/semesters", {
      params: { active_semester: 1 },
      headers: {
        Authorization: "Bearer " + loginData.access_token,
      },
    });
  };

  @action
  saveNewPassword = async (credentials) => {
    this.state = "pending";
    try {
      const res = await Axios.put(API_BASE_URL + `/password`, credentials, {
        headers: {
          Authorization:
            "Bearer " + storage.local.get(config.api.temp_access_token_key),
        },
      });

      const { status, data } = res;
      const token = storage.local.get(config.api.temp_access_token_key);
      storage.local.remove(config.api.temp_access_token_key);

      if (status === 200) {
        console.log("new password response data -> ", data);
        return this.getRequiredData({
          access_token: token,
        });
      }

      return res;
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
      return error.response;
    }
  };

  @action
  uploadNewAvatar = async (profile_img) => {
    this.state = "pending";
    try {
      const res = await client.put("/photo", { profile_img });

      const { status, data } = res;

      if (status === 200) {
        console.log("new avatar response data -> ", data);
      }

      return res;
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
      return error.response;
    }
  };

  @action
  sendVerify = async () => {
    this.state = "pending";
    try {
      const res = await Axios.get(API_URL + `/auth/send-verify`);

      const { status, data } = res;

      if (status === 200) {
        console.log("send verify response -> ", data);
        flash.setFlash(
          "success",
          "Sizning emailingizga tasdiqlash kodi yuborildi! Iltimos email pochtangizni tekshiring!"
        );
      }

      return res;
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
      return error.response;
    }
  };

  @action
  verifyCode = async () => {
    this.state = "pending";
    try {
      const res = await Axios.get(API_URL + `/auth/send-verify`);

      const { status, data } = res;

      if (status === 200) {
        console.log("send verify response -> ", data);
        flash.setFlash(
          "success",
          "Sizning emailingizga tasdiqlash kodi yuborildi! Iltimos email pochtangizni tekshiring!"
        );
      }

      return res;
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
      return error.response;
    }
  };

  @action
  setUser = (data) => {
    this.user = {
      id: data.id,
      username: data.username,
      email: data.email,
      avatar: data.file_url_photo,
      default_language: data.default_language,
      phone: data.phone,
    };
  };

  @action
  setUserData = (userData) => {
    if (!userData || !userData.id) return;
    this.setUser(userData);
    saveUser({
      id: userData.id,
      username: userData.username,
      email: userData.email,
      avatar: userData.file_url_photo,
      default_language: userData.default_language,
      phone: userData.phone,
    });
  };

  @computed
  get loading() {
    return this.state === "pending";
  }

  @action
  reset = () => {
    this.authenticated = false;
    this.user = {};
    this.accessToken = "";
    this.error = null;
    this.activeSemesterId = 0;
    this.state = "";
  };

  @action
  logout = () => {
    rmToken();
    this.reset();
  };

  @action
  uploadAvatar = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "put",
        url: "/photo",
        data: credentials,
      });
      if (response.status === 200) {
        this.setState("done");
        flash.setFlash("success", "Successfully created!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const auth = new AuthStore();

autorun(() => {
  console.log("auth store = ", auth);
  auth.accessToken && http.subscribe({ accessToken: auth.accessToken });
});

export default auth;
