import React from 'react';
import { string, array } from 'prop-types';
import { Select } from 'antd';

const FSelect = ({
  valueProp = 'id',
  outputProp = 'name',
  options = [],
  ...rest
}) => {
  return (
    <Select allowClear {...rest}>
      {options.map((item) => (
        <Select.Option key={item[valueProp]} value={item[valueProp]}>
          {item[outputProp]}
        </Select.Option>
      ))}
    </Select>
  );
};

FSelect.propTypes = {
  valueProp: string,
  outputProp: string,
  options: array.isRequired,
};

export default FSelect;
