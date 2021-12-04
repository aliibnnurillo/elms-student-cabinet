import axios from "axios";

import globalConfig from "config";

import storage from "../storage";

const request = axios.create({
  baseURL: globalConfig.api.base_url,
  responseType: "json",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=utf-8",
  },
  params: {},
});

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
