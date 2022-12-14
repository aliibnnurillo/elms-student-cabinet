import { action, computed, observable, runInAction } from "mobx";
import { client } from "../common/utils/request";
import moment from "moment";
class GlobalStore {
  @observable data = [];
  @observable state = "";
  @observable subjectModalVisible = false;
  @observable choice_of_subject = "";

  @action
  setChoiceOfSubject = (val) => {
    this.choice_of_subject = val;
  };

  @action
  setSubjectModalVisible = (val) => {
    this.subjectModalVisible = val;
  };

  @action
  fetchChoiceOfSubject = async (choice_of_subject, activeSemId) => {
    this.data = [];
    try {
      const res = await client.get(
        "/syllabus/semesterChoiceSubject/" + activeSemId,
        {
          params: choice_of_subject ? { choice_of_subject } : {},
        }
      );

      const { status, data } = res;
      if (status === 200) {
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
    }
  };

  @observable isAvailableChoice = false;
  @observable isChoiced = false;

  @computed
  get showChoiceAlert() {
    return !this.isChoiced && this.isAvailableChoice;
  }

  @action
  checkIsAvailableChoice = async () => {
    try {
      const res = await client.get("/syllabus/messageChoiceSubject");

      const { status, data } = res;
      if (status === 200) {
        runInAction(() => {
          this.isAvailableChoice = !!data.result;
        });
        if (data.result && moment(data.result).isBefore(moment())) {
          runInAction(() => {
            this.subjectModalVisible = true;
            this.isAvailableChoice = false;
          });
        }
        if (!data.result) {
          runInAction(() => {
            this.isChoiced = true;
            this.isAvailableChoice = false;
          });
        }
      }
    } catch (err) {
    }
  };

  @action
  fanTanlash = async (credentials = {}, activeSemId) => {
    this.list = [];
    try {
      const res = await client.post(
        `/syllabus/semesterChoiceSubjectStore/${activeSemId}`,
        { subject_id: credentials }
      );

      const { status, data } = res;
      if (status === 200) {
        runInAction(() => {
          this.subjectModalVisible = false;
          this.isChoiced = true;
        });
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
    }
  };
}

export default new GlobalStore();
