import { action, computed, observable, runInAction } from "mobx";
import { rmToken, setToken, validToken } from "../common/utils/utils";
import { API_URL, CURRENT_LANG } from "../constants";
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
        console.log(data);
        this.setUserData(data.result);
      }

      return res;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          flash.setFlash("error", error.response.data.message);
          return error.response;
        }
      }
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
    }
  };

  @action
  getProfileInfo = async () => {
    this.state = "pending";
    this.user = {};
    try {
      const res = await client.get("/profile/show", {
        params: { language: "uz" },
      });

      const { status, data } = res;
      console.log(res);

      if (status === 200) {
        // console.log(data);
      }

      return res;
    } catch (error) {
      runInAction(() => {
        this.state = "error";
        this.error = {
          message: "Произошла ошибка сети или внутренняя ошибка сервера!",
        };
      });
    }
  };

  @action
  saveNewEmail = async (credentials) => {
    this.state = "pending";
    this.reset();
    try {
      const res = await Axios.post(API_URL + "/auth/login", credentials);

      const { status, data } = res;

      if (status === 200 && data) {
        console.log(data);
        this.setUserData(data.result);
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
    }
  };

  @action
  setUserData = (data) => {
    if (!data) return;
    const { access_token } = data;
    setToken(access_token);
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
