import { action, computed, observable, runInAction } from "mobx";
import {
  rmToken,
  setToken,
  validToken,
  saveUser,
  getActiveSemester,
} from "../common/utils/utils";
import { client } from "../common/utils/request";

import { API_URL, CURRENT_LANG, API_BASE_URL } from "../constants";
import flash from "./Flash";
import Axios from "axios";

class AuthStore {
  @observable authenticated = false;
  @observable user = {};
  @observable accessToken = "";
  @observable state = "";
  @observable error = null;
  @observable activeSemesterId = getActiveSemester() || "semester";

  @computed
  get auth() {
    if (this.authenticated) {
      return true;
    }
    return validToken();
  }

  @action
  login = async (credentials) => {
    this.state = "pending";
    this.reset();
    try {
      const res = await Axios.post(API_URL + "/auth/login", credentials);

      const { status, data } = res;

      if (status === 200) {
        console.log("login response data => ", data);
        this.fetchActiveSemester(data.result.access_token)
          .then((res) => {
            if (res.status === 200) {
              const activeSemesterId =
                Array.isArray(res.data.result.data) &&
                res.data.result.data.length
                  ? res.data.result.data[0].id
                  : null;
              localStorage.setItem("active_sem", activeSemesterId);
              runInAction(() => {
                this.activeSemesterId = activeSemesterId;
              });
            }
          })
          .catch((err) => {
            console.log("fetch active  semester error => ", err);
          });
        return await this.getUserInfo(data.result);
      }
      return res;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          flash.setFlash("error", error.response.data.message);
        }
      }
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
  getUserInfo = async (loginData) => {
    this.state = "pending";
    this.user = {};
    try {
      const res = await Axios.get(API_URL + "/auth/user", {
        headers: {
          Authorization: "Bearer " + loginData.access_token,
        },
      });

      const { status, data } = res;
      console.log("user getdan kelgan  response => ", res);

      if (status === 200) {
        Array.isArray(data.result) &&
          data.result.length &&
          this.setUserData(loginData, data.result[0]);
      }

      return { ...loginData, status };
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
  getProfileInfo = async (loginData) => {
    this.state = "pending";
    this.user = {};
    try {
      const res = await Axios.get(API_BASE_URL + "/profile/show", {
        params: { language: CURRENT_LANG },
        headers: {
          Authorization: "Bearer " + loginData.access_token,
        },
      });

      const { status, data } = res;
      console.log(res);

      if (status === 200) {
        Array.isArray(data.result) &&
          data.result.length &&
          this.setUserData(loginData, data.result[0]);
      }

      return { ...loginData, status };
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
  setUser = (val) => {
    this.user = val;
  };

  @action
  saveNewEmail = async (credentials) => {
    this.state = "pending";

    try {
      const res = await Axios.put(API_URL + `/auth/email`, credentials);

      const { status, data } = res;

      if (status === 200) {
        console.log("attache email -> ", data);
      }

      return res;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 422) {
          flash.setFlash("error", error.response.data.message.email[0]);
        }
      }
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
  fetchActiveSemester = async (accessToken) => {
    return Axios.get(API_BASE_URL + "/syllabus/semesters", {
      params: { active_semester: 1 },
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });
  };

  @action
  saveNewPassword = async (credentials) => {
    this.state = "pending";
    try {
      const res = await Axios.put(API_URL + `/auth/password`, credentials);

      const { status, data } = res;

      if (status === 200) {
        console.log("new password response data -> ", data);
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
  setUserData = (loginData, userData) => {
    if (!loginData || !userData) return;
    const { access_token } = loginData;
    setToken(access_token);
    this.user = userData;
    saveUser(userData);
    this.authenticated = true;
    this.accessToken = access_token;
    this.state = "done";
    this.error = null;
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
    this.activeSemesterId = "";
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

export default new AuthStore();
