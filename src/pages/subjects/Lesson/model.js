import CommonStore from "../../../stores/commonStore";
import { observable, action, runInAction } from "mobx";
import { client } from "../../../common/utils/request";
import { CURRENT_LANG } from "../../../constants";
import flash from "../../../stores/Flash";
import moment from "moment";

class SubjectsModel extends CommonStore {
  @observable activeSemester = {};
  @observable semesters = [];
  @observable semesterSubjects = [];

  @action
  fetchActiveSemester = async () => {
    return client.get(this.url + "/semesters", {
      params: { active_semester: 1 },
    });
  };

  @action
  fetchSemesters = async () => {
    this.setState("pending");
    this.semesters = [];

    try {
      const response = await client.get("/syllabus/semesters");
      console.log(response);
      const { status, data } = response;
      if (status === 200) {
        this.setState("done");
        this.semesters = Array.isArray(data.result.data)
          ? data.result.data
          : [];
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  fetchSemesterSubjects = async () => {
    this.setState("pending");
    this.semesterSubjects = [];
    this.activeSemester = {};

    this.fetchActiveSemester()
      .then((res) => {
        const { data: { result } = {}, status } = res;
        if (status === 200) {
          console.log("active sem => ", res);
          runInAction(() => {
            this.activeSemester =
              Array.isArray(result.data) && result.data.length
                ? result.data[0]
                : {};
          });

          client({
            url: this.url + "/semesterSubject/" + this.activeSemester.id,
          })
            .then((res) => {
              const { data, status } = res;
              if (status === 200) {
                console.log(data);
                runInAction(() => {
                  this.semesterSubjects = Array.isArray(data.result.data)
                    ? data.result.data
                    : [];
                });
                this.setState("done");
              }
            })
            .catch((err) => {
              this.setState("error");
              flash.setFlash("error", "Error occurred!");
            });
        }
      })
      .catch((err) => {
        console.log("active semesterni olishda error => ", err);
      });
  };

  @action
  fetchOne = async (subject_id = "") => {
    this.setState("pending");
    this.setSingle({});

    if (!this.activeSemester.id) {
      await this.fetchActiveSemester()
        .then((res) => {
          const { data: { result } = {}, status } = res;
          if (status === 200) {
            runInAction(() => {
              this.activeSemester =
                Array.isArray(result.data) && result.data.length
                  ? result.data[0]
                  : {};
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    try {
      const response = await client.get(
        `${this.url}/semesterSubjectPlan/${this.activeSemester.id}`,
        {
          params: {
            language: CURRENT_LANG,
            subject_id,
          },
        }
      );
      const { status, data: { result } = {} } = response;
      console.log("fetchOne => ", response);
      if (status === 200) {
        const _result =
          Array.isArray(result.data) && result.data.length
            ? {
                ...result.data[0],
                module: Array.isArray(result.data[0].module)
                  ? result.data[0].module.map((module) => ({
                      ...module,
                      start_date: module.start_date
                        ? moment(module.start_date).format("D MMMM YYYY")
                        : null,
                      end_date: module.end_date
                        ? moment(module.end_date).format("D MMMM YYYY")
                        : null,
                    }))
                  : [],
              }
            : {};
        this.setSingle(_result);
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @observable currentLesson = {};
  @observable resourceType = "text";
  
  @action
  setResourceType = (type) => {
    this.resourceType = type;
  };

  @action
  fetchLesson = async ({ id = "" } = {}) => {
    this.setState("pending");
    this.currentLesson = {};
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${this.activeSemester.id}`,
        {
          params: {
            language: CURRENT_LANG,
            type: this.resourceType,
          },
        }
      );
      const { status, data } = response;
      console.log("fetchOne => ", response);
      if (status === 200) {
        this.setSingle(
          Array.isArray(data.result) && data.result.length ? data.result[0] : {}
        );
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const subjects = new SubjectsModel("/syllabus");

export default subjects;
