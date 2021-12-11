import React, { Fragment, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { Layout, Menu, Button, Spin } from "antd";
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

import "./message.scss";

const Messages = ({ match, message: { isLoading }, history }) => {
  const { path } = match;
  const { pathname } = useLocation();
  const { Sider, Content } = Layout;
  const [formValues, setFormValues] = useState(null);

  const getActiveUrl = () => {
    let key = pathname.split("/")[2];
    return key || "all";
  };

  return (
    <Fragment>
      <MessageHeader />
      <div className="content">
        <div className="messages-page">
          <Layout className="message-layout-wrapper" style={{ height: "100%" }}>
            <Sider className="message-sider" width={260}>
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
              >
                <Menu.Item style={{ height: 56 }} key={"compose"}>
                  <Link to="/messages/compose">
                    <Button
                      icon={<EditOutlined />}
                      style={{ marginBottom: 12 }}
                      block
                      type="primary"
                    >
                      Compose
                    </Button>
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<InboxOutlined />} key={"all"}>
                  <Link to="/messages/all">Inbox</Link>
                </Menu.Item>

                <Menu.Item icon={<SendOutlined rotate={-45} />} key={"sent"}>
                  <Link to="/messages/sent">Sent</Link>
                </Menu.Item>
                <Menu.Item icon={<FormOutlined />} key={"draft"}>
                  <Link to="/messages/draft">Draft</Link>
                </Menu.Item>
                <Menu.Item icon={<SnippetsOutlined />} key={"template"}>
                  <Link to="/messages/template">Template</Link>
                </Menu.Item>
                <Menu.Item icon={<DeleteOutlined />} key={"trash"}>
                  <Link to="/messages/trash">Trash</Link>
                </Menu.Item>
              </Menu>
            </Sider>
            <Content>
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
            </Content>
          </Layout>
        </div>
      </div>
    </Fragment>
  );
};

export default inject("message")(observer(Messages));
