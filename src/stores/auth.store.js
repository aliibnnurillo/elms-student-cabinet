import { action, computed, observable, runInAction } from "mobx";
import {
  rmToken,
  setToken,
  validToken,
  saveUser,
  getUser,
  isExistUser,
} from "../common/utils/utils";
import { API_URL, CURRENT_LANG, API_BASE_URL } from "../constants";
import flash from "./Flash";
import Axios from "axios";
import { client } from "../common/utils/request";

class AuthStore {
  @observable authenticated = false;
  @observable user = {};
  @observable accessToken = "";
  @observable state = "";
  @observable error = null;

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
  };

  @action
  logout = () => {
    rmToken();
    this.reset();
  };
}

export default new AuthStore();
