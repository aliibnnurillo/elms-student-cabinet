import CommonStore from "../../../stores/commonStore";
import { observable, action, reaction } from "mobx";
import { client } from "../../../common/utils/request";
import { CURRENT_LANG } from "../../../constants";
import flash from "../../../stores/Flash";
import { getImgaeUrl } from "../../../common/services/common";
import Axios from "axios";

class UploadModel extends CommonStore {
  @observable type = "upload";

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

const user = new UploadModel("/upload");

reaction(
  () => user.type,
  () => {
    user.fetchAll({ params: { type: user.type } });
  }
);

export default user;
