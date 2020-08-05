import { client } from "../common/utils/request";
import { action, computed, observable, runInAction } from "mobx";
import flash from "./Flash";
import { CURRENT_LANG } from "../constants";

class CommonStore {
  constructor(url) {
    this.url = url;
  }

  @observable result = {};
  @observable single = {};
  @observable state = ""; // pending, done, error

  @computed
  get success() {
    return this.state === "done";
  }

  @computed
  get loading() {
    return this.state === "pending";
  }

  @action
  setState = (val) => {
    this.state = val;
  };

  @action
  setResult = (val) => {
    this.result = val;
  };

  @action
  setSingle = (val) => {
    this.single = val;
  };

  @action
  fetchAll = async ({ url = this.url, params = {} } = {}) => {
    this.setState("pending");
    this.setResult({});

    try {
      const response = await client({
        url,
        params: { ...params, language: CURRENT_LANG },
      });
      const { status, data } = response;
      if (status === 200) {
        console.log(data);
        runInAction(() => {
          this.setState("done");
          this.setResult(data.result ? data.result : {});
        });
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  fetchOne = async ({ url = this.url, id = "", params = {} } = {}) => {
    this.setState("pending");
    this.setSingle({});
    try {
      const response = await client.get(`${url}/${id}`, {
        params: {
          ...params,
          language: CURRENT_LANG,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        this.setSingle(
          Array.isArray(data.result) && data.result.length ? data.result[0] : {}
        );
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  create = async ({ url = this.url, credentials = {} } = {}) => {
    this.setState("pending");
    try {
      const response = await client.post(url, credentials);
      const { status, data } = response;
      if (status === 200) {
        console.log(data);
        this.setState("done");
        flash.setFlash("success", "Successfully created!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  update = async ({ url = this.url, credentials } = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "put",
        url: `${url}/${credentials.id}`,
        data: credentials,
      });
      const { status, data } = response;
      if (status === 200) {
        this.setState("done");
        flash.setFlash("success", "Successfully updated!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  remove = async ({ url = this.url, id = "" } = {}) => {
    this.setState("pending");
    try {
      const response = await client({
        method: "delete",
        url: `${url}/${id}`,
      });
      const { status, data } = response;
      if (status === 200) {
        this.setState("done");
        flash.setFlash("success", "Successfully removed!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

export default CommonStore;
