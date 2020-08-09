import React from "react";
import { string, array } from "prop-types";
import { Select } from "antd";

const CSelect = ({
  valueProp = "id",
  outputProp = "name",
  options = [],
  ...rest
}) => {
  return (
    <Select {...rest}>
      {Array.isArray(options)
        ? options.map((item) => (
            <Select.Option key={item[valueProp]} value={item[valueProp]}>
              {item[outputProp]}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

CSelect.propTypes = {
  valueProp: string,
  outputProp: string,
  options: array,
};

export default CSelect;
