import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import {
  MailOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Divider, Modal } from "antd";
import { Spin } from "antd";

const Template = inject("message")(
  observer(
    ({
      message: { fetchAll, template, remove, isSubmitting },
      onSend,
    } = {}) => {
      useEffect(() => {
        fetchAll({ type: "template", params: { template_message: 1 } });
      }, []);

      function confirm(args) {
        Modal.confirm({
          title: "This is a warning message",
          icon: <ExclamationCircleOutlined />,
          content: "Are you sure to delete this message ?",
          okText: "Ok",
          cancelText: "Cancel",
          okType: "danger",
          onOk: () => {
            remove(args);
          },
        });
      }

      const columns = [
        {
          key: "msg",
          className: "message-col",
          render: (cell, record, index) => {
            return (
              <div className="message-wrapper">
                <div className="message-titles">
                  <div>
                    <strong style={{ fontSize: 16 }}>
                      {record.title ? record.title : null}
                    </strong>
                  </div>
                </div>
                <p style={{ color: "#8d8d8d" }}>
                  {record.message ? record.message : null}
                </p>
              </div>
            );
          },
        },
        {
          className: "action-col",
          render: (cell, record, index) => (
            <>
              <MailOutlined
                onClick={() =>
                  onSend({
                    id: record.id,
                    title: record.title,
                    message: record.message,
                  })
                }
              />
              <Divider type="vertical" />
              <DeleteOutlined
                onClick={() => confirm({ type: "template", id: record.id })}
              />
            </>
          ),
        },
      ];

      return (
        <div className="all-message">
          <h2>Template Messages</h2>
          <Spin spinning={isSubmitting}>
            <MessageTable data={template} specColumns={columns} />
          </Spin>
        </div>
      );
    }
  )
);

export default Template;
