import CommonStore from "../../stores/commonStore";
import { observable, action, reaction, runInAction } from "mobx";
import { client } from "../../common/utils/request";
import flash from "../../stores/Flash";
import { CURRENT_LANG } from "../../constants";

class ProfileModel extends CommonStore {
  @observable type = "profil";

  @observable profile = {};

  @action
  fetchProfile = async () => {
    this.state = "pending";
    try {
      const res = await client.get("/profile/show", {
        params: { language: CURRENT_LANG },
      });

      const { status, data } = res;

      if (status === 200) {
        if (Array.isArray(data.result) && data.result.length) {
          runInAction(() => {
            this.state = "done";
            this.profile = data.result[0];
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
  setType = (type) => {
    this.type = type;
  };
  @action
  setPhoto = (photo) => {
    this.photo = photo;
  };
  @action
  uploadAvatar = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "post",
        url: "/profile/photo",
        data: credentials,
      });
      if (response.status === 200) {
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  changePassword = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "post",
        url: "/profile/change-password",
        data: {
          password: credentials.password,
        },
      });
      if (response.status === 200) {
        this.setState("done");
        flash.setFlash("success", "Password successfully updated!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
  @action
  changeEmail = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "post",
        url: "/profile/change-email",
        data: {
          email: credentials.email,
        },
      });
      if (response.status === 200) {
        this.setState("done");
        flash.setFlash("success", "Email successfully updated!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
  @action
  changeUsername = async (credentials = {}) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "post",
        url: "/profile/change-username",
        data: {
          username: credentials.username,
        },
      });
      if (response.status === 200) {
        this.setState("done");
        flash.setFlash("success", "Username successfully updated!");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const profile = new ProfileModel("/profile");

reaction(
  () => profile.type,
  () => {
    profile.fetchAll({ params: { type: profile.type } });
  }
);

export default profile;
