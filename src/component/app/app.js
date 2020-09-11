import React, { useEffect } from "react";
import { LeftMenu } from "../header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./app.css";
import APINotification from "../APINotification";
import { privateRoutes, publicRoutes, errorRoutes } from "../../routes";
import PrivateRoute from "../PrivateRoute";
import { Button, Radio, Col, Spin, Modal, message, Form } from "antd";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";

const App = () => {
  return (
    <div>
      <Router>
        <LeftMenu />
        <Switch>
          {publicRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
          {privateRoutes.map((route, idx) => (
            <PrivateRoute key={idx} {...route} exact />
          ))}
          {errorRoutes.map((route, idx) => (
            <Route {...route} key={idx} />
          ))}
        </Switch>
      </Router>
      <APINotification />
      <SubjectSelectModal />
    </div>
  );
};

export default App;

export const SubjectSelectModal = inject("glo")(
  observer(
    ({
      glo: {
        fetchChoiceOfSubject,
        setSubjectModalVisible,
        subjectModalVisible,
        data,
      },
    }) => {
      useEffect(() => {
        fetchChoiceOfSubject();
      }, []);

      const [t] = useTranslation();

      const handleCancel = () => {
        setSubjectModalVisible(false);
      };

      const handleFinish = (values) => {
        console.log(Object.values(values));
      };

      return (
        <Modal
          visible={subjectModalVisible}
          title={t("Tanlov fanlari")}
          footer={null}
          className="for-modal"
          onCancel={() => {
            handleCancel();
          }}
        >
          <Form layout="vertical" onFinish={handleFinish}>
            {data.map((item, idx) => {
              return (
                <div key={idx}>
                  <h3>
                    {t("Tanlov")} {idx + 1}
                  </h3>
                  <div className="syllabus-select-wrapper">
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: t(
                            "Siz kamida bitta fan tanlashingiz zarur!"
                          ),
                        },
                      ]}
                      name={idx}
                    >
                      <Radio.Group className="syllabus-select-modal">
                        {item.choice_subject.map((subject, ind) => {
                          return (
                            <Radio
                              style={{ display: "block" }}
                              key={ind}
                              value={subject.id}
                            >
                              {subject.subject_choice_name
                                ? subject.subject_choice_name.name
                                : null}
                            </Radio>
                          );
                        })}
                      </Radio.Group>
                    </Form.Item>
                  </div>
                </div>
              );
            })}
            <div className="button-wrapper">
              <Button
                type="primary"
                className="button-for-select"
                htmlType="submit"
              >
                {t("Select")}
              </Button>
            </div>
          </Form>
        </Modal>
      );
    }
  )
);
