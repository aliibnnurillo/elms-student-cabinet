import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Button, Spin, Table, message, Carousel, Radio } from "antd";
import { useParams, Link } from "react-router-dom";
import { SubjectsHeader } from "component/header";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import "./subject.css";

const columnsForTestResult = [
  { title: "Urinish", align: "center", dataIndex: "count_of_attempts" },
  {
    title: "Talaba",
    dataIndex: "fio",
  },
  { title: "Jami", dataIndex: "test_total" },
  { title: "To'g'ri", dataIndex: "test_answered" },
  { title: "Noto'g'ri", dataIndex: "test_un_answered" },
  {
    title: "Ball",
    dataIndex: "mark",
    render: (cell) => (cell ? cell : null),
  },
  { title: "Sana", dataIndex: "test_date" },
];

const TestItem = ({
  data,
  totalMidtermExamCount,
  midtermExamQuestionList,
  sendAnswerToMEQuestion,
  completeMidtermExam,
  exam_schedule_id,
  control_type_id,
  testResult,
  isTestCompleted,
  isTestStarted,
  setIsTestCompleted,
  setIsTestStarted,
}) => {
  const [current, setCurrent] = useState(0);
  const [valueone, setValueone] = useState("");

  const [t] = useTranslation();

  const onChangeAnswer = (e) => {
    setValueone(e.target.value);
  };
  const onChange = (from, to) => {
    setCurrent(current + 1);
  };
  const carousel = useRef(null);

  const onSendAnswer = () => {
    if (!valueone) {
      message.error(t("Siz javob tanlamadingiz!"));
      return;
    }

    sendAnswerToMEQuestion({
      exam_schedule_id,
      control_type_id,
      test_question_id: midtermExamQuestionList[current].id,
      test_answer_id: [valueone],
    }).then((res) => {
      if (res.status === 200) {
        

        if (current + 1 !== totalMidtermExamCount) {
          setValueone("");
          carousel.current.next();
        } else {
          completeMidtermExam({ exam_schedule_id, control_type_id });
          setCurrent(0);
        }
      }
    });
  };


  return (
    <div>
      <div className="question-test">
        {(isTestStarted || !isTestCompleted) &&
        data.count_of_attempts &&
        testResult.length < data.count_of_attempts ? (
          <>
            <h2>
              {t("Test savoli")}
              <span>
                {current + 1} / {totalMidtermExamCount}
              </span>
            </h2>
            <Carousel ref={carousel} beforeChange={onChange}>
              {midtermExamQuestionList.map((test) => {
                return (
                  <div key={test.id}>
                    <div className="question sun-editor-editable">
                      <div
                        dangerouslySetInnerHTML={{ __html: test.question }}
                      />
                    </div>

                    <Radio.Group onChange={onChangeAnswer} value={valueone}>
                      {test.test_answers.map((item, idx) => {
                        const regex = /<.+?>/g;
                        return (
                          <Radio value={item.id}>
                            {regex.test(item.answer) ? (
                              <p
                                dangerouslySetInnerHTML={{
                                  __html: item.answer,
                                }}
                              />
                            ) : (
                              item.answer
                            )}
                          </Radio>
                        );
                      })}
                    </Radio.Group>
                  </div>
                );
              })}
            </Carousel>
            <p className="next">
              <Button disabled={!valueone} onClick={onSendAnswer}>
                {current + 1 === totalMidtermExamCount
                  ? t("Yakunlash")
                  : t("Keyingi savol")}
              </Button>
            </p>
          </>
        ) : (
          <div style={{ padding: "0 24px" }}>
            {testResult.length ? (
              <div>
                <div className="d-flex-c flex-column">
                  <h3>
                    Urinishlar soni: {testResult.length} /&nbsp;
                    {data.count_of_attempts}
                  </h3>
                  {data.count_of_attempts > testResult.length ? (
                    <Button
                      type="primary"
                      size="large"
                      onClick={() => setIsTestCompleted(false)}
                      style={{ marginBottom: 24 }}
                    >
                      {t('Qayta urinish')}
                    </Button>
                  ) : null}
                </div>
                <Table
                  title={() => "Test natijalari"}
                  columns={columnsForTestResult}
                  dataSource={testResult}
                  pagination={false}
                  rowKey={"id"}
                />
              </div>
            ) : (
              <div>
                <div className="d-flex-c flex-column">
                  {!!data.count_of_attempts && (
                    <h3>{t('Urinishlar soni')}: {data.count_of_attempts}</h3>
                  )}
                  <Button
                    type="primary"
                    size="large"
                    onClick={() => setIsTestStarted(true)}
                  >
                    {t('Testni boshlash')}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const ExamSchedule = ({
  subjects: {
    fetchMidtermExamQuestionList,
    fetchExamListByType,
    loading,
    midtermExamQuestionList,
    sendAnswerToMEQuestion,
    completeMidtermExam,
    testResult,
    isTestCompleted,
    isTestStarted,
    setIsTestStarted,
    setIsTestCompleted,
    totalMidtermExamCount,
    currentExam,
    getMEResult,
  },
}) => {
  const { examId, type, id } = useParams();
  useEffect(() => {
    (async () => {
      await fetchExamListByType({ subject_id: id, control_type_id: type });
      await fetchMidtermExamQuestionList({
        exam_id: examId,
        control_type_id: type,
      });
      getMEResult({ control_type_id: type, exam_schedule_id: examId });
    })();
  }, [examId, id, type, fetchMidtermExamQuestionList]);
  const [t] = useTranslation();
  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <Spin spinning={loading}>
          <div className="subject_about">
            <Row gutter={50}>
              <Col span={24}>
                <TestItem
                  data={currentExam}
                  {...{
                    completeMidtermExam,
                    sendAnswerToMEQuestion,
                    testResult,
                    isTestCompleted,
                    isTestStarted,
                    setIsTestCompleted,
                    setIsTestStarted,
                    totalMidtermExamCount,
                    midtermExamQuestionList,
                    exam_schedule_id: examId,
                    control_type_id: type,
                  }}
                />
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    </>
  );
};

  export default inject("subjects")(observer(ExamSchedule));
