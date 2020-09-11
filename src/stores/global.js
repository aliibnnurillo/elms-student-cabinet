import { action, computed, observable, runInAction } from "mobx";
import { client } from "../common/utils/request";
import { getActiveSemester } from "../common/utils/utils";

class GlobalStore {
  @observable data = [];
  @observable choiceOfSubjectGroupId = "";
  @observable state = "";
  @observable subjectModalVisible = true;

  @action
  setSubjectModalVisible = (val) => {
    this.subjectModalVisible = val;
  };

  @action
  fetchChoiceOfSubject = async () => {
    this.data = [];
    try {
      const res = await client.get(
        "/syllabus/semesterChoiceSubject/" + getActiveSemester(),
        {
          params: this.choiceOfSubjectGroupId
            ? { choice_of_subject: this.choiceOfSubjectGroupId }
            : {},
        }
      );

      const { status, data } = res;
      if (status === 200) {
        console.log(res.data);
        const _res = Array.isArray(data.result.data)
          ? data.result.data.map(
              (item) =>
                Array.isArray(item.semestr_subject) && item.semestr_subject[0]
            )
          : [];
        runInAction(() => {
          this.data = _res;
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  @observable isAvailableChoice = true;

  @action
  checkIsAvailableChoice = async () => {
    this.data = [];
    try {
      const res = await client.get("/syllabus/messageChoiceSubject", {});

      const { status, data } = res;
      if (status === 200) {
        console.log("avalilab l => ", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  @action
  fanTanlash = async (credentials = {}) => {
    this.list = [];
    try {
      const res = await client.post(
        "​/syllabus​/semesterChoiceSubjectStore​/" + getActiveSemester(),
        { subject_id: credentials }
      );

      const { status, data } = res;
      if (status === 200) {
        console.log(res.data);
        // const _res = Array.isArray(data.result.data)
        //   ? data.result.data.map(
        //       (item) =>
        //         Array.isArray(item.semestr_subject) && item.semestr_subject[0]
        //     )
        //   : [];
        // runInAction(() => {
        //   this.list = _res;
        // });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default new GlobalStore();
