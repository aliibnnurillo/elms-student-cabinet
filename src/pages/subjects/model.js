import CommonStore from "../../stores/commonStore";
import { observable, action, runInAction, computed } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import moment from "moment";
import authStore from "../../stores/auth.store";

class SubjectsModel extends CommonStore {
  @observable activeSemester = {};
  @observable semesters = [];
  @observable semesterSubjects = [];

  @observable activeItemId = "";

  @action
  setActiveItemId = (val) => {
    this.activeItemId = val;
  };

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
              ? data.result.data.sort(
                  (a, b) => a.choice_of_subject - b.choice_of_subject
                )
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
    this.setCurrentSubject(null);

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
                      read_total_lesson_item: Array.isArray(module.lessons)
                        ? module.lessons.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.read_total_lesson_item,
                            0
                          )
                        : 0,
                      total_lesson_item: Array.isArray(module.lessons)
                        ? module.lessons.reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue.total_lesson_item,
                            0
                          )
                        : 0,
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
        this.setCurrentSubject(_result);
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
  @observable allowCommentToLesson = false;

  @action
  fetchLessonItems = async ({
    semesterId,
    subjectId,
    lessonId,
    params = {},
  } = {}) => {
    this.setState("pending");
    this.lessonItems = [];
    this.setTestResult([]);

    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${semesterId}`,
        {
          params: {
            ...params,
            subject_id: subjectId,
            language: CURRENT_LANG,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
      console.log("fetch lesson items => ", response);
      if (status === 200) {
        const _ans = Array.isArray(data.result.data)
          ? data.result.data.map((item) => {
              if (item.type === "test") {
                let current = { ...item };
                current.test_question = Array.isArray(current.test_question)
                  ? current.test_question.map((item) => ({
                      ...item,
                      test_answers: Array.isArray(item.test_answers)
                        ? item.test_answers.map((ans) => ({
                            label: ans.answer,
                            value: ans.id,
                          }))
                        : [],
                    }))
                  : [];
                return current;
              } else {
                return item;
              }
            })
          : [];
        this.allowCommentToLesson =
          _ans.length && _ans[0].allow_comment_after_correct_answer;
        this.lessonItems = _ans;
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  // @observable breadcrumb = [];

  @observable currentSubject = null;

  @action
  setCurrentSubject = (val) => {
    this.currentSubject = val;
  };

  @computed
  get breadcrumb() {
    let result = [];
    if (this.currentSubject) {
      result.push({
        name: this.currentSubject.subject_name,
        id: this.currentSubject.subject_id,
      });
    }
    if (this.currentLesson) {
      result.push({
        name: this.currentLesson.name,
        id: this.currentLesson.id,
      });
    }
    return result;
  }

  @observable isTestStarted = false;

  @action
  setIsTestStarted = (val) => {
    this.isTestStarted = val;
  };

  @action
  fetchOneLessonItem = async ({
    semesterId,
    subjectId,
    lessonId,
    id = "",
    type = "",
  } = {}) => {
    this.setState("pending");
    this.isTestCompleted = false;
    this.isTestStarted = false;
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${semesterId}`,
        {
          params: {
            type,
            syllabus_module_lesson_item_id: id,
            subject_id: subjectId,
            language: CURRENT_LANG,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
      console.log("fetch one lesson item => ", data);
      if (status === 200) {
        const copy = Array.from(this.lessonItems);
        const removedIndex = copy.findIndex((item) => +item.id === +id);

        if (removedIndex !== -1) {
          copy[removedIndex].read_total_lesson_item = 1;
          this.lessonItems = copy;
        }
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
  sendAnswerToTestQuestion = async (
    itemId = "",
    test_question_id = "",
    test_answer_id = ""
  ) => {
    this.setState("pending");
    try {
      const response = await client.post(
        "/syllabus/InCompleteTestStore/" + itemId,
        { test_question_id, test_answer_id }
      );
      const { status } = response;
      if (status === 200) {
        this.setState("done");
      }
      return response;
    } catch (error) {
      this.setState("error");
      return error.response;
    }
  };

  @observable isTestCompleted = true;

  @action
  setIsTestCompleted = (val) => {
    this.isTestCompleted = val;
  };

  @action
  completeTest = async (itemId = "") => {
    this.setState("pending");

    try {
      const response = await client.post(
        "/syllabus/CompleteTestStore/" + itemId
      );
      const { status } = response;
      console.log("complte test response => ", response);
      if (status === 200) {
        this.setState("done");
        this.getTestResult(itemId);
        this.setIsTestCompleted(true);
        this.setIsTestStarted(false);
      }
    } catch (error) {
      this.setState("error");
    }
  };
  @observable testResult = [];

  @action
  setTestResult = (val) => {
    this.testResult = val;
  };
  @action
  getTestResult = async (itemId = "") => {
    this.setState("pending");
    this.testResult = [];
    try {
      const response = await client.get("/syllabus/CompleteTest", {
        params: {
          language: CURRENT_LANG,
          syllabus_module_lesson_item_id: itemId,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        this.setState("done");
        const _res = Array.isArray(data.result.data)
          ? data.result.data.reverse()
          : [];
        runInAction(() => {
          this.testResult = _res;
        });
      }
    } catch (error) {
      this.setState("error");
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

  @observable resourceFiles = [];

  @action
  fetchLessonResources = async ({ semesterId, subjectId, lessonId } = {}) => {
    this.setState("pending");
    this.resourceFiles = [];
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonResource/${semesterId}`,
        {
          params: {
            subject_id: subjectId,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
      console.log("fetch lesson resources => ", response);
      if (status === 200) {
        const _result = Array.isArray(data.result.data)
          ? data.result.data.map((item) => ({
              ...item,
              fileName: item.file_url_resource.slice(
                item.file_url_resource.lastIndexOf("/") + 1
              ),
            }))
          : [];
        this.resourceFiles = _result;
        this.setState("done");
        console.log("fayllar => ", this.resourceFiles);
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const subjects = new SubjectsModel("/syllabus");

export default subjects;
