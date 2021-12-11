import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import { useTranslation } from "react-i18next";
import { isExistUser, getUser } from "../../common/utils/utils";
import { Spin } from "antd";
const Sent = inject("message")(
  observer(({ message: { fetchAll, sent, remove, isSubmitting } }) => {
    useEffect(() => {
      fetchAll({
        type: "sent",
        params: { status: 1, sender_id: isExistUser() && getUser().id },
      });
    }, []);
    const [t] = useTranslation();
    return (
      <div className="all-message">
        <h2>{t("Sent Messages")}</h2>
        <Spin spinning={isSubmitting}>
          <MessageTable data={sent} type="sent" remove={remove} />
        </Spin>
      </div>
    );
  })
);

export default Sent;
