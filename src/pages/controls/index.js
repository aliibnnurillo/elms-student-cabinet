import React, { useEffect, useState } from "react";
import { Calendar, Badge } from "antd";
import { ControlsHeader } from "component/header";
import { http } from "../../services";
import config from "../../config";
import get from "lodash/get";
import { CURRENT_LANG } from "../../constants";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import moment from "moment";

import './Controls.scss';

const Controls = () => {
  const [data, setData] = useState([]);
  const location = useLocation();
  const { a_year, s_type, curriculum_id } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    http.request
      .get("/api/teacher/rating/get-exam-schedule", {
        baseURL: config.api.root_url,
        params: {
          language: CURRENT_LANG,
          academic_year_id: a_year,
          season_semester: s_type,
          curriculum_id,
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

    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.id}>
            <div className="controls__subject">{get(item, "subject_name")}</div>
            <Badge status={item.type} text={get(item, "control_type_name")} />
            <div className="deadline-time">
              <span className={"deadline-time__start"}>
                {get(item, "start_date").format("HH:mm")}
              </span>
              {get(item, "end_date") && (
                <>
                  <span>-</span>
                  <span className={"deadline-time__start"}>
                    {get(item, "end_date").format("HH:mm")}
                  </span>
                </>
              )}
            </div>
            <div className={"deadline-time__desc"}>{get(item, "content")}</div>
          </li>
        ))}
      </ul>
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
