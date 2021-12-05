import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { http } from "../../services";
import config from "../../config";
import get from "lodash/get";
import { inject } from "mobx-react";

const AcademicYearSelect = (props) => {
  const [options, setOptions] = useState([]);

  const getOptions = () => {
    http.request
      .get("/api/crm/academic-years/list", {
        baseURL: config.api.root_url,
        params: {
          university_id: get(props, "authStore.profile.university_id") || 0,
        },
      })
      .then(({ data }) => {
        const options = (get(data, "result") || []).map((item) => ({
          value: item.id || 0,
          name: `${get(item, "start_year")}-${get(item, "end_year")}`,
        }));
        setOptions(options);
      });
  };

  useEffect(() => {
    getOptions();
  }, []);

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

export default inject("authStore")(AcademicYearSelect);
