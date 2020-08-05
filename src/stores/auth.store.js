import { action, computed, observable, runInAction } from "mobx";
import { client } from "../common/utils/request";
import { rmToken, setToken, validToken } from "../common/utils/utils";
import { API_URL } from "../constants";
import flash from "./Flash";
import Axios from "axios";

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

      if (status === 200 && data) {
        console.log(data);
        this.setUserData(data.result);
      }
      return status;
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
  getRolePermissions = async (arr) => {
    this.state = "pending";
    try {
      let obj = [];
      for (let i = 0; i < arr.length; i++) {
        const response = await client({
          method: "get",
          url: `/v1/role/permissions/${arr[i]}`,
        });
        if (response.status === 200) {
          obj = [...obj, ...response.data];
        }
      }
      const groupBy = (xs, key) => {
        return xs.reduce((rv, x) => {
          (rv[x["title"][key]] = rv[x["title"][key]] || []).push(x.name);
          return rv;
        }, {});
      };
      runInAction(() => {
        this.state = "done";
        this.rolePermissions = groupBy(obj, "en");
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
      throw e;
    }
  };

  @action
  logout = async () => {
    this.state = "pending";
    // await client.get('/auth/logout');
    rmToken();
    this.reset();
    this.state = "done";
  };
}

export default new AuthStore();
