import React from "react";
import moment from "moment";

import { useState, useEffect } from "react";
import {
  Row,
  Input,
  Col,
  List,
  Button,
  Comment,
  Form,
  Avatar,
  Anchor,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import StepsBlock from "./steps";
import { SubjectsHeader } from "../../component/header";

const { Link } = Anchor;

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item className="write-comment">
      <TextArea
        rows={1}
        cols={24}
        onChange={onChange}
        value={value}
        placeholder="Sharh qoldirish"
      />
      <Button
        type="link"
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        className="comment-send"
      >
        <SendOutlined />
      </Button>
    </Form.Item>
  </>
);

const Lesson = () => {
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([]);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmitting(true);

    setTimeout(() => {
      setValue("");
      setSubmitting(false);
      setComments([
        {
          author: "Alisher Saidov",
          avatar:
            "https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200",
          content: <p>{value}</p>,
          datetime: moment().format("DD-MMM h:mm:ss a"),
        },
        ...comments,
      ]);
    }, 1000);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <SubjectsHeader />
      <div className="content">
        <div className="tasks">
          <Row gutter={20}>
            <Col span={6}>
              <div className="task-list">
                <Anchor className="task-menu">
                  <Link
                    href="#1"
                    className="lesson-name"
                    title="1  Algoritm va dasturlashga..."
                  >
                    <Link
                      href="#1.1"
                      title="1.1 Dasturlash tillarining tuzil..."
                    />
                    <Link href="#1.2" title="1.2 Algoritm va dasturlashga..." />
                  </Link>
                  <Link
                    href="#2"
                    className="lesson-name"
                    title="2  Algoritm va dasturlashga..."
                  >
                    <Link
                      href="#2.1"
                      title="2.1 Tarmoqlanish va uzilishlarni..."
                    />
                    <Link href="#2.2" title="2.2 Takrorlanish operatorlari." />
                  </Link>
                  <Link
                    href="#3"
                    className="lesson-name"
                    title="3  Funksiyalar va to’plamlar..."
                  >
                    <Link href="#3.1" title="2.1 Funksiyalar." />
                    <Link href="#3.2" title="2.2 Massivlar." />
                    <Link
                      href="#3.3"
                      title="3.3 Ko‘rsatkichlar va dinamik..."
                    />
                  </Link>
                </Anchor>
              </div>
            </Col>
            <Col span={18}>
              <Row>
                <StepsBlock />

                <Col span={18} offset={3} className="comments-list">
                  <h3>{comments.length}-ta sharh</h3>
                  <>
                    <Comment
                      avatar={
                        <Avatar
                          src="https://avatars.mds.yandex.net/get-yapic/53031/My8MspR9WyDaZDsW3fJAJJsgI-1/islands-200"
                          alt="Alisher Saidov"
                          size={40}
                        />
                      }
                      content={
                        <Editor
                          onChange={handleChange}
                          onSubmit={handleSubmit}
                          submitting={submitting}
                          value={value}
                        />
                      }
                    />
                    {comments.length > 0 && <CommentList comments={comments} />}
                  </>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Lesson;
