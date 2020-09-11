import CommonStore from "../../stores/commonStore";
import { client } from "../../common/utils/request";
import { action } from "mobx";
import flash from "../../stores/Flash";

class CurriculumModel extends CommonStore {
  @action
  fetchAll = async ({ url = this.url, params = {} } = {}) => {
    this.setState("pending");
    this.setResult({});

    try {
      const response = await client({
        url,
      });
      const { status, data } = response;
      console.log("fetch curriculum => ", response);
      if (status === 200) {
        this.setState("done");
        this.setResult(data.result ? data.result : {});
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const post = new CurriculumModel("/curriculum");

export default post;
