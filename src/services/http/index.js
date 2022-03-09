import axios from "axios";

import globalConfig from "config";
import history from "../history";
import flash from "../../stores/Flash";

const request = axios.create({
  baseURL: globalConfig.api.base_url,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  params: {},
});

function clientResponseInterceptor() {
  const interceptor = request.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response) {
        responseStatusCheck(error.response.status);
      }
      return Promise.reject(error);
    }
  );
}

clientResponseInterceptor();

function responseStatusCheck(status) {
  if (status === 402) {
    history.push("/402");
  }
}

const subscribe = ({ accessToken }) => {
  if (accessToken) {
    request.defaults.headers["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete request.defaults.headers["Authorization"];
  }
};

export default {
  request,
  subscribe,
};
