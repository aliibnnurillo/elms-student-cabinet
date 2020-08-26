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

    client({
      url: this.url + "/semesterSubject/" + localStorage.getItem("active_sem"),
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

  @observable comments = [];

  @action
  fetchComments = async (lessonId = "") => {
    this.setState("pending");
    this.comments = [];
    try {
      const response = await client.get(
        `/syllabus/CommentaryLesson/${lessonId}`
      );
      const {
        status,
        data: { result },
      } = response;
      console.log("fetch comments response => ", response);
      if (status === 200) {
        const _finalResult = Array.isArray(result.data)
          ? result.data.map((comment) => {
              return {
                author: comment.user.username,
                avatar: comment.user.avatar,
                content: comment.title,
                datetime: comment.updated_at,
              };
            })
          : [];
        this.comments = _finalResult;
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  saveComment = async (lessonId = "", message = "") => {
    this.setState("pending");
    try {
      const response = await client.post(
        "/syllabus/CommentaryLessonStore/" + lessonId,
        { title: message }
      );
      const { status, data } = response;
      if (status === 200) {
        this.fetchComments(lessonId);
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @observable questionFiles = [];
  @observable oldQuestionFiles = [];

  @action
  setOldQuestionFiles = (files) => {
    this.oldQuestionFiles = files;
  };

  @action
  setQuestionFiles = (files) => {
    this.questionFiles = files;
  };

  removeQuestionFile = (uid) => {
    this.questionFiles = this.questionFiles.filter((item) => item.uid !== uid);
  };

  @action
  fetchOldQuestionFiles = async (itemId = "") => {
    this.state = "pending";
    this.oldQuestionFiles = [];
    try {
      const response = await client({
        url: `/syllabus/QuestionAttempt/${itemId}`,
      });
      const {
        status,
        data: { result },
      } = response;
      console.log("old questionni fayllari => ", response);

      if (status === 200) {
        const _result = Array.isArray(result.data) ? result.data : [];
        console.log(_result);
        this.setOldQuestionFiles(_result);
        this.setState("done");
      }
      return response;
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  saveQuestionFile = async (itemId = "", resource = 0) => {
    this.state = "pending";
    try {
      const response = await client({
        method: "post",
        url: `/syllabus/QuestionAttemptStore/${itemId}`,
        data: { resource },
      });

      if (response.status === 200) {
        console.log("save question => ", response);
        this.setQuestionFiles([]);
        flash.setFlash("success", "Fayl muvaffaqiyatli yuklandi!");
        this.state = "done";
      }

      return response;
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
      return error.response;
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
