import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import {
  SendOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { remove } from "mobx";
import { Divider, Modal, Spin } from "antd";
import { useTranslation } from "react-i18next";
import get from "lodash/get";
import { isExistUser, getUser } from "../../common/utils/utils";
import { CURRENT_LANG } from "../../constants";

const Draft = inject("message")(
  observer(
    ({
      message: { fetchAll, draft, remove, sendMessage, isSubmitting },
      authStore,
    }) => {
      useEffect(() => {
        fetchAll({
          type: "draft",
          params: {
            language: CURRENT_LANG,
            status: false,
            sender_id: isExistUser() && getUser().id,
          },
        });
      }, []);
      const [t] = useTranslation();

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

      const newCol = {
        className: "action-col",
        render: (cell, record, index) => (
          <>
            <SendOutlined onClick={() => sendMessage(record.id)} />
            <Divider type="vertical" />
            <DeleteOutlined
              disabled={isSubmitting}
              onClick={() => confirm({ type: "draft", id: record.id })}
            />
          </>
        ),
      };
      return (
        <div className="all-message">
          <h2>{t("Draft Messages")}</h2>
          <Spin spinning={isSubmitting}>
            <MessageTable data={draft} newCol={newCol} />
          </Spin>
        </div>
      );
    }
  )
);

export default Draft;
