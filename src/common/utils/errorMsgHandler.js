import get from "lodash/get";

export const errorMsgHandler = ({
  error,
  msgPath = "response.data.message",
  callback,
}) => {
  const msg = get(error, msgPath) || "";

  msg && callback && callback(msg);
};
