import CommonStore from "../../stores/commonStore";
import { observable, action, reaction } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import { getImgaeUrl } from "../../common/services/common";

class NewsModel extends CommonStore {
  @observable type = "news";

  @action
  setType = (type) => {
    this.type = type;
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
        const _result =
          Array.isArray(data.result) && data.result.length
            ? data.result[0]
            : {};

        if (_result.img) {
          await getImgaeUrl(_result.img)
            .then((imageUrl) => {
              _result.img = imageUrl;
            })
            .catch((err) => {
              console.log(err);
            });
        }
        this.setSingle(_result);
        this.setState("done");
      }
    } catch (error) {
      console.log(error);
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const post = new NewsModel("/posts");

reaction(
  () => post.type,
  () => {
    post.fetchAll({ params: { type: post.type } });
  }
);

export default post;
