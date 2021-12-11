import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import { useTranslation } from "react-i18next";
import { getUser, isExistUser } from "../../common/utils/utils";

const Inbox = inject("message")(
  observer(({ message: { fetchAll, inbox, remove } }) => {
    useEffect(() => {
      fetchAll({
        type: "inbox",
        params: { status: 1, receiver_id: isExistUser() && getUser().id },
      });
    }, []);

    const [t] = useTranslation();

    return (
      <div className="all-message">
        <h2>{t("Inbox Messages")}</h2>
        <MessageTable data={inbox} remove={remove} type="inbox" />
      </div>
    );
  })
);

export default Inbox;
