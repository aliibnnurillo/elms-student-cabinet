import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import { MailOutlined, DeleteOutlined } from "@ant-design/icons";
import { Divider } from "antd";

const Template = inject("message")(
  observer(({ message: { fetchAll, template, remove }, onSend } = {}) => {
    useEffect(() => {
      fetchAll({ type: "template", params: { template_message: 1 } });
    }, []);

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
              onClick={() => remove({ type: "template", id: record.id })}
            />
          </>
        ),
      },
    ];

    return (
      <div className="all-message">
        <h2>Template Messages</h2>

        <MessageTable data={template} specColumns={columns} />
      </div>
    );
  })
);

export default Template;
