import React, { useEffect, useState } from 'react';
import { string, object, bool, array, oneOfType } from 'prop-types';
import { Select, Spin, Empty } from 'antd';
import { fetchOptions } from '../../common/services/common';

const FetchSelect2 = ({
  url = '',
  valueProp = 'id',
  outputProp = 'name',
  params = {},
  isResultArray = true,
  fetchInMount = false,
  ...rest
}) => {
  const [stateOptions, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    if (fetchInMount) {
      fetchOptions({ url, params })
        .then((res) => {
          if (isMounted) {
            if (isResultArray) {
              Array.isArray(res.data.result) && setOptions(res.data.result);
            } else {
              Array.isArray(res.data.result.data) &&
                setOptions(res.data.result.data);
            }
          }
        })
        .catch(() => {});
    }
    return () => {
      isMounted = false;
    };
  }, [fetchInMount, isResultArray, setOptions]);

  const handleFocus = () => {
    setLoading(true);
    setOptions([]);
    fetchOptions({ url, params })
      .then((res) => {
        setLoading(false);
        if (isResultArray) {
          Array.isArray(res.data.result) && setOptions(res.data.result);
        } else {
          Array.isArray(res.data.result.data) &&
            setOptions(res.data.result.data);
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const output = (data) => {
    const output = Array.isArray(outputProp)
      ? `${data[outputProp[0]]} - ${data[outputProp[1]]}`
      : data[outputProp];
    return output;
  };

  return (
    <Select
      notFoundContent={loading ? <Spin /> : <Empty />}
      onFocus={handleFocus}
      allowClear
      {...rest}
    >
      {Array.isArray(stateOptions)
        ? stateOptions.map((item) => (
            <Select.Option key={item[valueProp]} value={item[valueProp]}>
              {output(item)}
            </Select.Option>
          ))
        : null}
    </Select>
  );
};

FetchSelect2.propTypes = {
  url: string.isRequired,
  params: object,
  valueProp: string,
  outputProp: oneOfType([string, array]),
  fetchInMount: bool,
};

export default FetchSelect2;
