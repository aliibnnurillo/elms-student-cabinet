import React, { useEffect, useState } from 'react';
import { string, object, bool } from 'prop-types';
import { Select } from 'antd';
import { fetchOptions } from '../../common/services/common';

const FetchSelect = ({
  url = '',
  valueProp = 'id',
  outputProp = 'name',
  params = {},
  options = [],
  fetchInMount = true,
  isResultArray = true,
  ...rest
}) => {
  const [stateOptions, setOptions] = useState(options);

  useEffect(() => {
    let isMounted = true;
    if (!stateOptions.length && fetchInMount) {
      fetchOptions({ url, params })
        .then((res) => {
          isMounted &&
            Array.isArray(res.data.result) &&
            res.data.result.length &&
            setOptions(res.data.result);
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [stateOptions, fetchOptions]);

  const handleFocus = () => {
    if (!stateOptions.length) {
      fetchOptions({ url, params })
        .then((res) => {
          Array.isArray(res.data.result) &&
            res.data.result.length &&
            setOptions(res.data.result);
        })
        .catch(() => {});
    }
  };

  return (
    <Select
      // notFoundContent={<Spin size="middle" />}
      onFocus={handleFocus}
      allowClear
      {...rest}
    >
      {stateOptions.map((item) => (
        <Select.Option key={item[valueProp]} value={item[valueProp]}>
          {item[outputProp]}
        </Select.Option>
      ))}
    </Select>
  );
};

FetchSelect.propTypes = {
  url: string.isRequired,
  params: object,
  valueProp: string,
  outputProp: string,
  fetchInMount: bool,
};

export default FetchSelect;
