import axios from "axios";
import { API_BASE_URL, API_URL } from "../../constants";
import flash from "../../stores/Flash";
import { getToken, rmToken, setToken } from "./utils";
import { history } from "services";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

client.interceptors.request.use(function (config) {
  config.headers.Authorization = "Bearer " + getToken();
  return config;
});

function clientResponseInterceptor() {
  const interceptor = client.interceptors.response.use(
    (response) => response,
    (error) => {
      networkError(error);
      if (error.response) {
        responseStatusCheck(error.response.status);
        // if (error.response.status === 401) {
        //   client.interceptors.response.eject(interceptor);
        //
        //   return client
        //     .get(API_URL + "/auth/refresh")
        //     .then((response) => {
        //       setToken(response.data.result);
        //       error.response.config.headers["Authorization"] =
        //         "Bearer " + response.data.result;
        //       return client(error.response.config);
        //     })
        //     .catch((error) => {
        //       rmToken();
        //       history.push("/");
        //       return Promise.reject(error);
        //     })
        //     .finally(clientResponseInterceptor);
        // }
      }
      return Promise.reject(error);
    }
  );
}

clientResponseInterceptor();

function networkError(err) {
  if (err.message === "Network Error" && !err.response) {
    flash.setFlash("error", "Internal server occurred!");
  }
}

function responseStatusCheck(status) {
  if (status === 402) {
    history.push("/402");
  }
}

export { client };
