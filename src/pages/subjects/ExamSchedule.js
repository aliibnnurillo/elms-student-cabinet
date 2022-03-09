import React, { useEffect } from "react";
import { Row, Col, Button, Spin, Empty, Table } from "antd";
import { useParams, Link, useLocation } from "react-router-dom";
import { SubjectsHeader } from "component/header";
import { inject, observer } from "mobx-react";
import { useTranslation } from "react-i18next";
import get from "lodash/get";

import "./subject.css";

const ExamSchedule = ({
  subjects: { fetchExamListByType, loading, examList },
  authStore,
}) => {
  const { id, type } = useParams();
  const { pathname } = useLocation();
  useEffect(() => {
    fetchExamListByType({
      subject_id: id,
      control_type_id: type,
      activeSemesterId: get(authStore, "activeSemesterId") || 0,
    });
    return () => {};
  }, [id, fetchExamListByType]);
  const [t] = useTranslation();
  console.log("exam list = ", examList);

  const columnsForME = [
    { title: "Fan", dataIndex: "subject_name" },
    {
      title: "Test soni",
      dataIndex: "count_of_test_for_student",
    },
    { title: "Boshlanadi", dataIndex: "start_date" },
    { title: "Yakunlanadi", dataIndex: "end_date" },
    { title: "Urinishlar soni", dataIndex: "count_of_attempts" },
    { title: "Reyting", dataIndex: "rating_all_test" },
    {
      title: "Amallar",
      render: (current, record) => {
        return (
          <>
            {record.type === "test" && (
              <Link to={`${pathname}/${record.id}`}>Boshlash</Link>
            )}
          </>
        );
      },
    },
  ];
  const columnsForFE = [
    { title: "Fan", dataIndex: "subject_name" },
    { title: "Boshlanadi", dataIndex: "start_date" },
  ];

  let title = (type === "2" ? "Oraliq" : type === "3" && "Yakuniy") || "";

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <Spin spinning={loading}>
          <div className="subject_about">
            <Row gutter={50}>
              <Col span={24}>
                {(type === "2" || type === "3") && (
                  <Table
                    locale={{
                      emptyText: `Hali ${title.toLowerCase()} nazorat mavjud emas`,
                    }}
                    title={() => (
                      <h2 style={{ marginLeft: -16 }}>
                        {title} nazorat jadvali
                      </h2>
                    )}
                    columns={type === "2" ? columnsForME : columnsForFE}
                    dataSource={examList}
                    pagination={false}
                    rowKey={"id"}
                  />
                )}
              </Col>
            </Row>
          </div>
        </Spin>
      </div>
    </>
  );
};

export default inject("subjects")(observer(ExamSchedule));
