import CommonStore from "../../stores/commonStore";
import { observable, action, reaction } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import { getImgaeUrl } from "../../common/services/common";
import Axios from "axios";

class ProfileModel extends CommonStore {
  @observable type = "news";

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
        flash.setFlash("success", "Successfully created!");
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
          email: credentials.email,
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
          username: credentials.username,
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
