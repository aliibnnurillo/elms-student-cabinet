import CommonStore from "../../stores/commonStore";
import { observable, action, runInAction, computed } from "mobx";
import { client } from "../../common/utils/request";
import { CURRENT_LANG } from "../../constants";
import flash from "../../stores/Flash";
import moment from "moment";
import _ from "lodash";
import { errorMsgHandler } from "common/utils/errorMsgHandler";

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
  fetchSemesters = async () => {
    this.setState("pending");
    this.semesters = [];

    try {
      const response = await client.get("/syllabus/semesters");
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
  fetchSemesterSubjects = async ({ activeSemId }) => {
    this.setState("pending");
    this.semesterSubjects = [];

    client({
      url: this.url + "/semesterSubject/" + activeSemId,
    })
      .then((res) => {
        const { data, status } = res;
        if (status === 200) {
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
  fetchOne = async (subject_id = "", activeSemId = 0) => {
    this.setState("pending");
    this.setSingle({});
    this.setCurrentSubject(null);

    try {
      const response = await client.get(
        `${this.url}/semesterSubjectPlan/${activeSemId}`,
        {
          params: {
            language: CURRENT_LANG,
            subject_id,
          },
        }
      );
      const { status, data: { result } = {} } = response;
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
                        ? moment(module.start_date, "DD.MM.YYYY").format(
                            "D MMMM YYYY"
                          )
                        : null,
                      end_date: module.end_date
                        ? moment(module.end_date, "DD.MM.YYYY").format(
                            "D MMMM YYYY"
                          )
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

  @observable examList = [];

  @action
  fetchExamListByType = async ({
    control_type_id,
    subject_id,
    semester_id,
  }) => {
    this.setState("pending");
    this.examList = [];

    try {
      const response = await client.get(`/FirstExam/GetSchedule`, {
        params: {
          language: CURRENT_LANG,
          control_type_id,
          subject_id,
          semester_id,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        const _result = _.get(data, "result") || [];
        this.setState("done");
        runInAction(() => {
          this.examList = _result;
        });
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
  autoSetCurrentLesson = (id) => {
    const filtered = Array.isArray(this.single.module)
      ? this.single.module.filter((item) =>
          item.lessons.some((item) => item.id === +id)
        )
      : null;
    if (filtered) {
      this.currentLesson = filtered[0];
    }
  };

  @action
  fetchLessonItems = async ({
    semId,
    subjectId,
    lessonId,
    params = {},
  } = {}) => {
    this.setState("pending");
    this.lessonItems = [];
    this.setTestResult([]);
    this.isTestCompleted = true;
    this.isTestStarted = false;
    this.autoSetCurrentLesson(lessonId);
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${semId}`,
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
    semId,
    subjectId,
    lessonId,
    id = "",
    type = "",
  } = {}) => {
    this.setState("pending");

    try {
      const response = await client.get(
        `/syllabus/SubjectLessonItems/${semId}`,
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

  // midterm exam start

  @observable currentExam = {};
  @observable midtermExamQuestionList = [];

  @computed
  get totalMidtermExamCount() {
    return (this.midtermExamQuestionList || []).length;
  }

  @action
  setCurrentExam = (value) => {
    this.currentExam = value;
  };

  @action
  fetchMidtermExamQuestionList = async ({ exam_id, control_type_id }) => {
    this.setState("pending");

    try {
      const _currentExam =
        (this.examList || []).find(
          (item) => Number(item.id) === Number(exam_id)
        ) || {};
      this.setCurrentExam(_currentExam);
      const response = await client.get(`/FirstExam/startExam/${exam_id}`, {
        params: {
          control_type_id,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        const _finalResult = _.get(data, "result");
        runInAction(() => {
          this.midtermExamQuestionList = _finalResult;
        });
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };

  @action
  sendAnswerToMEQuestion = async ({
    exam_schedule_id = "",
    control_type_id = 2,
    test_question_id = "",
    test_answer_id = [],
  }) => {
    this.setState("pending");
    try {
      const response = await client.post(
        "/FirstExam/InCompleteTestStore/" + exam_schedule_id,
        { test_question_id, test_answer_id },
        {
          params: {
            control_type_id,
          },
        }
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

  @action
  completeMidtermExam = async ({ exam_schedule_id, control_type_id = 2 }) => {
    this.setState("pending");

    try {
      const response = await client.post(
        "/FirstExam/CompleteTestStore/" + exam_schedule_id,
        {},
        { params: { control_type_id } }
      );
      const { status } = response;
      if (status === 200) {
        this.setState("done");
        this.getMEResult({ control_type_id, exam_schedule_id });
        this.setIsTestCompleted(true);
        this.setIsTestStarted(false);
      }
    } catch (error) {
      this.setState("error");
    }
  };

  @action
  getMEResult = async ({ exam_schedule_id, control_type_id }) => {
    this.setState("pending");
    this.testResult = [];
    try {
      const response = await client.get("/syllabus/CompleteTest", {
        params: {
          language: CURRENT_LANG,
          exam_schedule_id,
          control_type_id,
        },
      });
      const { status, data } = response;
      if (status === 200) {
        const _res = _.get(data, "result.data") || [];
        runInAction(() => {
          this.testResult = _res;
        });
        this.setState("done");
      }
    } catch (error) {
      this.setState("error");
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
    test_answer_id = []
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
// add semId//
  @action
  saveComment = async ({lessonId = "", values= "", semId}) => {
    this.setState("pending");
    try {
      const response = await client.post(
        "/syllabus/CommentaryLessonStore/" + lessonId,
        { title: values, semester_id: semId }
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

      if (status === 200) {
        const _result = Array.isArray(result.data) ? result.data : [];
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
        this.setQuestionFiles([]);

        flash.setFlash("success", "Fayl muvaffaqiyatli yuklandi!");
        this.state = "done";
      }

      return response;
    } catch (error) {
      this.setState("error");

      errorMsgHandler({
        error,
        callback: (msg) => flash.setFlash("error", msg),
      });
      return error.response;
    }
  };

  @observable resourceFiles = [];

  @action
  fetchLessonResources = async ({ semId, subjectId, lessonId } = {}) => {
    this.setState("pending");
    this.resourceFiles = [];
    try {
      const response = await client.get(
        `/syllabus/SubjectLessonResource/${semId}`,
        {
          params: {
            subject_id: subjectId,
            syllabus_module_lesson_id: lessonId,
          },
        }
      );
      const { status, data } = response;
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
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const subjects = new SubjectsModel("/syllabus");

export default subjects;
