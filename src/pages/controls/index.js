import React, { useEffect, useState } from "react";
import { Calendar, Badge, Popover } from "antd";
import { ControlsHeader } from "component/header";
import { http } from "../../services";
import config from "../../config";
import get from "lodash/get";
import { CURRENT_LANG } from "../../constants";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import moment from "moment";
import cx from "classnames";

import "./Controls.scss";

const Controls = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { a_year, s_type, curriculum_id } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    http.request
      .get("/api/student/FirstExam/GetSchedule", {
        baseURL: config.api.root_url,
        params: {
          language: CURRENT_LANG,
          academic_year_id: a_year,
          season_semester: s_type,
          curriculum_id: curriculum_id,
        },
      })
      .then(({ data }) => {
        const result = (get(data, "result") || []).map((item) => ({
          id: item.id || 0,
          start_date: moment(get(item, "start_date"), "DD.MM.YYYY HH:mm:ss"),
          end_date: get(item, "end_date")
            ? moment(get(item, "end_date"), "DD.MM.YYYY HH:mm:ss")
            : "",
          subject_name: get(item, "subject_name") || "",
          control_type_name: get(item, "control_type_name") || "",
          type: get(item, "control_type_id") === 2 ? "warning" : "error",
          content: get(item, "description") || "",
        }));
        setData(result);
      });
  }, [a_year, s_type, curriculum_id]);

  function dateCellRender(value) {
    const formatted = value.format("YYYY-MM-DD");
    const listData = data.filter((item) =>
      moment(formatted).isSame(item.start_date.format("YYYY-MM-DD"))
    );

    const getTooltipData = (items) => {
      return (
        <div className="tooltip">
          <div className="tooltip__top">
            {moment(get(value, "_d")).format("llll")}
          </div>
          <div className="tooltip__content">
            {items.map((item, key) => (
              <div className={cx("tooltip__item", get(item, "type"))} key={key}>
                <div className="tooltip__date">
                  {!!get(item, "start_date") && (
                    <div className="tooltip__deadline">
                      {moment(get(item, "start_date")).format("HH:mm")}
                    </div>
                  )}
                  {!!get(item, "end_date") && (
                    <div className="tooltip__deadline">
                      {moment(get(item, "end_date")).format("HH:mm")}
                    </div>
                  )}
                </div>
                <div className={cx("tooltip__subject", get(item, "type"))}>
                  <div className="tooltip__subject--name">
                    {get(item, "subject_name")}
                  </div>
                  <div className="tooltip__subject--type">
                    {get(item, "control_type_name")}
                  </div>
                  {!!get(item, "content") && (
                    <div className="tooltip__subject--description">
                      {get(item, "content")}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    return (
      <Popover content={getTooltipData(listData)} placement="rightTop">
        <ul className="events">
          {listData.map((item) => (
            <li key={item.id} className={"events__item"}>
              <div className="controls__subject">
                {get(item, "subject_name")}
              </div>
              <Badge status={item.type} text={get(item, "control_type_name")} />
            </li>
          ))}
        </ul>
      </Popover>
    );
  }

  return (
    <>
      <ControlsHeader />
      <div className="content" style={{ overflowX: "hidden" }}>
        <Calendar dateCellRender={dateCellRender} />
      </div>
    </>
  );
};

export default Controls;
