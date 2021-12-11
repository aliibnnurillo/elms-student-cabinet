import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import { useTranslation } from "react-i18next";
import { isExistUser, getUser } from "../../common/utils/utils";

const Sent = inject("message")(
  observer(({ message: { fetchAll, sent, remove } }) => {
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

        <MessageTable data={sent} type="sent" remove={remove} />
      </div>
    );
  })
);

export default Sent;
