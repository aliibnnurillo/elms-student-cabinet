import React, { useEffect, useState } from "react";
import { string, object, bool } from "prop-types";
import { Select, Spin } from "antd";
import { fetchOptions } from "../common/services/common";

const FetchSelect = ({
  url = "",
  valueProp = "id",
  outputProp = "name",
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
        .catch((err) => {
        });
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
  return (
    <Select
      notFoundContent={loading ? <Spin /> : <div>No data</div>}
      onFocus={handleFocus}
      {...rest}
    >
      {Array.isArray(stateOptions)
        ? stateOptions.map((item) => (
            <Select.Option key={item[valueProp]} value={item[valueProp]}>
              {item[outputProp]}
            </Select.Option>
          ))
        : null}
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
