import CommonStore from "../../stores/commonStore";
import { observable, action, runInAction } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import moment from "moment";
import authStore from "../../stores/auth.store";

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

    console.log(authStore.activeSemesterId);
    client({
      url: this.url + "/semesterSubject/" + authStore.activeSemesterId,
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
  };

  @action
  fetchOne = async (subject_id = "") => {
    this.setState("pending");
    this.setSingle({});

    // if (!authStore.activeSemesterId) {
    //   await this.fetchActiveSemester()
    //     .then((res) => {
    //       const { data: { result } = {}, status } = res;
    //       if (status === 200) {
    //         runInAction(() => {
    //           this.activeSemester =
    //             Array.isArray(result.data) && result.data.length
    //               ? result.data[0]
    //               : {};
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    try {
      const response = await client.get(
        `${this.url}/semesterSubjectPlan/${authStore.activeSemesterId}`,
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
  @observable lessonItems = [];

  @action
  setResourceType = (type) => {
    this.resourceType = type;
  };

  @action
  fetchLessonItems = async ({ semesterId, subjectId, lessonId } = {}) => {
    this.setState("pending");
    this.lessonItems = [];
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${semesterId}`,
        {
          params: {
            subject_id: subjectId,
            language: CURRENT_LANG,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
      console.log("fetch lesson items => ", response);
      if (status === 200) {
        this.lessonItems = Array.isArray(data.result.data)
          ? data.result.data
          : [];
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  fetchLessonResources = async ({ semesterId, subjectId, lessonId } = {}) => {
    this.setState("pending");
    // this.currentLesson = {};
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonResource/${semesterId}`,
        {
          params: {
            subject_id: subjectId,
            language: CURRENT_LANG,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
      console.log("fetch lesson items => ", response);
      if (status === 200) {
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
