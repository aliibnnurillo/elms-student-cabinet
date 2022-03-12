import CommonStore from "../../stores/commonStore";
import { client } from "../../common/utils/request";
import { action } from "mobx";
import flash from "../../stores/Flash";
import get from "lodash/get";

class RatingModel extends CommonStore {
  @action
  fetchAll = async ({ url = this.url, params = {} } = {}) => {
    this.setState("pending");
    this.setResult([]);

    try {
      const response = await client({
        url,
      });
      const { status, data } = response;

      if (status === 200) {
        this.setState("done");

        const ratingNotes = (get(data, "result.data") || []).map((item) => ({
          id: get(item, "id"),
          semestrNumber: Number(get(item, "semester_name")),
          startDate: get(item, "start_date"),
          endDate: get(item, "end_date"),
          facultyName: get(item, "faculty_name"),
          specialityName: get(item, "speciality_name"),
          semestrSubjects: (get(item, "semestr_subject") || []).map((item) => ({
            id: get(item, "id"),
            hour: get(item, "hour") || 0,
            semesterId: get(item, "semester_id"),
            creditHours: get(item, "credit_hour"),
            choiceOfSubject: !!get(item, "choice_of_subject"),
            teacherName: get(item, "teacher.teacher_translations[0].fio"),
            name: get(item, "subject_choice_name.name"),
            language: get(item, "subject_choice_name.language"),
            subjectId: get(item, "subject_choice_name.subject_id"),
            ratingRegisters:
              get(item, "subject_choice_name.rating_registers.rating") || 0,
          })),
        }));

        this.setResult(ratingNotes);
      }
    } catch (error) {
      this.setState("error");
      flash.setFlash("error", "Error occurred!");
    }
  };
}

const post = new RatingModel("/rating-note");

export default post;
