import CommonStore from "../../stores/commonStore";
import { action, runInAction, observable } from "mobx";
import { client } from "../../common/utils/request";
import flash from "../../stores/Flash";
import { DATE_FORMATS } from "../../constants";
import moment from "moment";
import { Modal } from "antd";

class MessageModel extends CommonStore {
  @observable draft = [];
  @observable sent = [];
  @observable template = [];
  @observable inbox = [];
  @observable trash = [];
  @observable isLoading = true;
  @observable isSubmitting = false;

  @action
  fetchAll = async ({ type = "inbox", params = {} } = {}) => {
    this.state = "pending";
    this[type] = [];

    try {
      const response = await client({
        url: this.url,
        params,
      });
      const { status, data } = response;
      if (status === 200) {
        runInAction(() => {
          this.state = "done";
          this.isLoading = false;
          this[type] =
            Array.isArray(data.result.data) &&
            data.result.data.map((msg) => ({
              ...msg,
              updated_at: msg.updated_at
                ? moment(msg.updated_at).format(DATE_FORMATS.DMY_D)
                : moment().format(DATE_FORMATS.DMY_D),
            }));
        });
      }
    } catch (error) {
      this.isLoading = false;
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  create = async ({ url = this.url, credentials } = {}) => {
    this.state = "pending";
    this.isSubmitting = true;
    try {
      const response = await client({
        method: "post",
        url,
        data: credentials,
      });
      if (response.status === 200) {
        this.setState("done");
        flash.setFlash("success", "Successfully created!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    } finally {
      runInAction(() => {
        this.isSubmitting = false;
      })

    }
  };

  @action
  sendMessage = async (id = "") => {
    this.state = "pending";
    try {
      const response = await client({
        method: "put",
        url: "/messages/" + id,
        data: { status: true },
      });
      if (response.status === 200) {
        this.draft = this.draft.filter((msg) => msg.id !== id);
        this.setState("done");
        flash.setFlash("success", "Successfully created!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  sendTemplateMessage = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "put",
        url: "/messages/sendTemplate/" + credentials.id,
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
  @action
  remove = async ({ type = "inbox", id = "" } = {}) => {
    this.state = "pending";
    this.isSubmitting = true;
    try {
      const response = await client({
        method: "delete",
        url: `${this.url}/${id}`,
      });
      if (response.status === 200) {
        runInAction(() => {
          this[type] = this[type].filter((msg) => msg.id !== id);
          this.state = "done";
        });
        flash.setFlash("success", "Successfully removed!");
      }
    } catch (error) {
      this.setState("error");
      const { status, data } = error.response;
      if (status === 405) {
        Modal.warning({
          maskClosable: true,
          title: "Ogohlantirish",
          content: data.message,
        });
        return;
      }

      flash.setFlash("error", "Server error occurred!");
      flash.setFlash("error", "Error occurred!");
    }
    finally {
      runInAction(() => {
        this.isSubmitting = false
      })
    }
  };
}

const message = new MessageModel("/messages");
export default message;
