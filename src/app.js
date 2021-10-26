import React, { useEffect } from "react";
import { Button, Radio, Modal, Form } from "antd";
import { observer, inject } from "mobx-react";
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { privateRoutes, publicRoutes, errorRoutes } from "routes";

import "react-quill/dist/quill.snow.css";
import "./app.css";

import { LeftMenu } from "component/header";
import APINotification from "component/APINotification";
import PrivateRoute from "component/PrivateRoute";

import { getActiveSemester } from "common/utils/utils";

const App = () => {
  React.useEffect(() => {
    const el = document.getElementById("loading-screen");
    el && el.classList.add("loaded");
    setTimeout(() => el && el.remove(), 1000);
  }, []);

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

export const SubjectSelectModal = inject(
  "glo",
  "authStore"
)(
  observer(
    ({
      glo: {
        fetchChoiceOfSubject,
        setSubjectModalVisible,
        subjectModalVisible,
        data,
        fanTanlash,
        isAvailableChoice,
        choice_of_subject,
      },
      authStore: { authenticated },
    }) => {
      useEffect(() => {
        authenticated && fetchChoiceOfSubject(choice_of_subject);
      }, [authenticated, choice_of_subject, fetchChoiceOfSubject]);

      const [t] = useTranslation();

      const handleCancel = () => {
        if (isAvailableChoice) setSubjectModalVisible(false);
      };

      const handleFinish = (values) => {
        console.log(Object.values(values));
        fanTanlash(Object.values(values));
        if (choice_of_subject)
          window.location.href = `/${getActiveSemester()}/subjects`;
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
          closable={isAvailableChoice}
          maskClosable={isAvailableChoice}
        >
          {choice_of_subject ? (
            <p>Bu tanlanadigan fan. Siz oldin fan tanlashingiz zarur!</p>
          ) : null}
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
                              value={subject.subject_id}
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
