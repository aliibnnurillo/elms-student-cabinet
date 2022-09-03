import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { http } from "services";
import config from "config";
import get from "lodash/get";
import { useLocation } from "react-router-dom";
import qs from "query-string";
import { inject } from "mobx-react";
import { getUni, isExistUni } from "../../common/utils/utils";

const CurriculumFilterSelect = (props) => {
  const location = useLocation();
  const [options, setOptions] = useState([]);

  const { activeAcdYearId, univer } = props.authStore;

  const { a_year = activeAcdYearId } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    http.request
      .get("/api/crm/curriculum/list", {
        baseURL: config.api.root_url,
        params: {
          university_id: univer.id,
          academic_year_id: a_year,
        },
      })
      .then(({ data }) => {
        const options = (get(data, "result") || []).map((item) => ({
          value: +item.id || 0,
          name: `${get(item, "name")}`,
        }));
        setOptions(options);
      });
  }, [a_year]);

  return (
    <Select {...props}>
      {(options || []).map((item) => (
        <Select.Option key={item.value} value={item.value}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default inject("authStore")(CurriculumFilterSelect);
