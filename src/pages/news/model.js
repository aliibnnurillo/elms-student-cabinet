import CommonStore from "../../stores/commonStore";
import { observable, action, reaction } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import { getImgaeUrl } from "../../common/services/common";
import Axios from "axios";

class NewsModel extends CommonStore {
  @observable type = "news";

  @action
  setType = (type) => {
    this.type = type;
  };

  fetchAll = async ({ url = this.url, params = {} } = {}) => {
    this.setState("pending");
    this.setResult({});

    try {
      const response = await client({
        url,
        params: { ...params, language: CURRENT_LANG },
      });
      const { status, data } = response;
      console.log("fetchAll => ", response);
      if (status === 200) {
        const _result = data.result ? data.result : {};
        const list = Array.isArray(_result.data) ? _result.data : [];

        await Axios.all(
          list.map((item) => item.img && getImgaeUrl(item.img))
        ).then((res) => {
          console.log("news res= > ", res);
          res.forEach((imageUrl, index) => {
            list[index].img = imageUrl;
          });
        });

        console.log("yangi res => ", _result);
        this.setResult(_result);
        this.setState("done");
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
