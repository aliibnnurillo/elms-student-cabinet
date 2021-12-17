import React, { useEffect } from "react";
import { inject, observer } from "mobx-react";
import MessageTable from "./MessageTable";
import { useTranslation } from "react-i18next";
import { Spin } from "antd";
import { CURRENT_LANG } from "../../constants";

const Trash = inject("message")(
  observer(({ message: { fetchAll, trash, remove, isSubmitting } }) => {
    useEffect(() => {
      fetchAll({
        type: "trash",
        params: { language: CURRENT_LANG, only_trashed: 1 },
      });
    }, []);
    const [t] = useTranslation();
    return (
      <div className="all-message">
        <h2>{t("Deleted Messages")}</h2>
        <Spin spinning={isSubmitting}>
          <MessageTable data={trash} type="trash" remove={remove} />
        </Spin>
      </div>
    );
  })
);

export default Trash;
