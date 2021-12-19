import React, { Fragment, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Menu, Button, Spin, Row, Col } from "antd";
import {
  InboxOutlined,
  SendOutlined,
  FormOutlined,
  DeleteOutlined,
  SnippetsOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link, Route, useLocation } from "react-router-dom";
import Inbox from "./Inbox";
import Draft from "./Draft";
import Sent from "./Sent";
import Trash from "./Trash";
import Template from "./Template";
import Compose from "./Compose";
import { MessageHeader } from "component/header";

// import "./message.scss";

const Messages = ({ match, message: { isLoading }, history }) => {
  const { path } = match;
  const { pathname } = useLocation();
  const [formValues, setFormValues] = useState(null);

  const getActiveUrl = () => {
    let key = pathname.split("/")[2];
    return key || "all";
  };

  return (
    <Fragment>
      <MessageHeader />
      <div className="content letter-content">
        <Row gutter={[16, 16]}>
          <Col lg={{ span: 7 }} md={{ span: 12 }}>
            <Menu
              defaultSelectedKeys={getActiveUrl()}
              defaultOpenKeys={[
                "all",
                "compose",
                "sent",
                "draft",
                "template",
                "trash",
              ]}
              style={{ height: "100%", borderRadius: "12px" }}
            >
              <Menu.Item
                key={"compose"}
                className={"compose-btn"}
                style={{ marginTop: 20 }}
              >
                <Link to="/messages/compose">
                  <Button icon={<EditOutlined />} block type="primary">
                    Compose
                  </Button>
                </Link>
              </Menu.Item>
              <Menu.Item
                icon={<InboxOutlined />}
                key={"all"}
                className={"message-menu-item"}
              >
                <Link to="/messages/all">Inbox</Link>
              </Menu.Item>

              <Menu.Item
                icon={<SendOutlined rotate={-45} />}
                key={"sent"}
                className={"message-menu-item"}
              >
                <Link to="/messages/sent">Sent</Link>
              </Menu.Item>
              <Menu.Item
                icon={<FormOutlined />}
                key={"draft"}
                className={"message-menu-item"}
              >
                <Link to="/messages/draft">Draft</Link>
              </Menu.Item>
              <Menu.Item
                icon={<SnippetsOutlined />}
                key={"template"}
                className={"message-menu-item"}
              >
                <Link to="/messages/template">Template</Link>
              </Menu.Item>
              <Menu.Item
                icon={<DeleteOutlined />}
                key={"trash"}
                className={"message-menu-item"}
              >
                <Link to="/messages/trash">Trash</Link>
              </Menu.Item>
            </Menu>
          </Col>
          <Col
            lg={{ span: 17 }}
            md={{ span: 12 }}
            sm={{ span: 24 }}
            xsm={{ span: 24 }}
          >
            <div className={"message-content"}>
              <Spin spinning={getActiveUrl() === "compose" ? false : isLoading}>
                <Route
                  path={`${path}/compose`}
                  render={(props) => (
                    <Compose {...props} formValues={formValues} />
                  )}
                />
                <Route path={`${path}/all`} component={Inbox} />
                <Route path={`${path}/draft`} component={Draft} />
                <Route path={`${path}/sent`} component={Sent} />
                <Route
                  path={`${path}/template`}
                  render={(props) => (
                    <Template
                      onSend={(values) => {
                        setFormValues(values);
                        history.push("/messages/compose");
                      }}
                      {...props}
                    />
                  )}
                />
                <Route path={`${path}/trash`} component={Trash} />
                <Route path={`${path}`} exact={true} component={Inbox} />
              </Spin>
            </div>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default inject("message")(observer(Messages));
