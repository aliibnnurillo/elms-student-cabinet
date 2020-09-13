import CommonStore from "../../stores/commonStore";
import { client } from "../../common/utils/request";
import { action } from "mobx";
import flash from "../../stores/Flash";

class CurriculumModel extends CommonStore {
  @action
  fetchAll = async ({ url = this.url, params = {} } = {}) => {
    this.setState("pending");
    this.setResult([]);

    try {
      const response = await client({
        url,
      });
      const { status, data } = response;
      console.log("fetch curriculum => ", response);
      if (status === 200) {
        this.setState("done");
        if (Array.isArray(data.result.data)) {
          const _res = data.result.data.map((item) => ({
            ...item,
            student_subject: {
              notChoice: item.student_subject.filter(
                (item) => !item.choice_of_subject
              ),
              choice: item.student_subject.filter(
                (item) => item.choice_of_subject
              ),
            },
          }));
          this.setResult(_res);
        }
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const post = new CurriculumModel("/curriculum");

export default post;
