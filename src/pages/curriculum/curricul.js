import React, { useEffect } from "react";
import { CuriculHeader } from "../../component/header";
import { List } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import "../examn/exam.css";
import "./curicul.css";
import { inject, observer } from "mobx-react";
const Curiculum = (props) => {
  const {
    curriculum: { fetchAll },
  } = props;

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      <CuriculHeader />
      <div className="content exam-page curicul-page">
        <h3>Kompyuter injiniringi</h3>
        <h1>Multimedia texnologiyalari</h1>
        <div className="all-exam">
          <div>
            <h4>1-kurs</h4>
            <div className="curicul-content">
              <List
                size="large"
                className="curicul-list"
                header={
                  <p>
                    <span>1-smestr</span>
                    <span>02.09.2020 - 20.02.2021</span>
                  </p>
                }
              >
                <List.Item>
                  <span>Algoritm loyihalash</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Xorijiy til 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Chiziqli algebra</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Fizika 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Dasturlash 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item className="for-choice">
                  <List className="choice" header={<p>tanlangan</p>}>
                    <List.Item>
                      <span>Telekommunikatsiyada operatsion tizimlar</span>
                      <span>
                        120
                        <ClockCircleFilled />
                      </span>
                    </List.Item>
                    <List.Item>
                      <span>Akademik yozuv 2</span>
                      <span>
                        105
                        <ClockCircleFilled />
                      </span>
                    </List.Item>
                  </List>
                </List.Item>
              </List>
              <List
                size="large"
                className="curicul-list"
                header={
                  <p>
                    <span>1-smestr</span>
                    <span>02.09.2020 - 20.02.2021</span>
                  </p>
                }
              >
                <List.Item>
                  <span>Algoritm loyihalash</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Xorijiy til 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Chiziqli algebra</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Fizika 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item>
                  <span>Dasturlash 2</span>
                  <span>
                    180
                    <ClockCircleFilled />
                  </span>
                </List.Item>
                <List.Item className="for-choice">
                  <List className="choice" header={<p>tanlangan</p>}>
                    <List.Item>
                      <span>Telekommunikatsiyada operatsion tizimlar</span>
                      <span>
                        120
                        <ClockCircleFilled />
                      </span>
                    </List.Item>
                    <List.Item>
                      <span>Akademik yozuv 2</span>
                      <span>
                        105
                        <ClockCircleFilled />
                      </span>
                    </List.Item>
                  </List>
                </List.Item>
              </List>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default inject("curriculum")(observer(Curiculum));
