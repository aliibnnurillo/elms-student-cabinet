import axios from "axios";
import { API_BASE_URL, API_URL } from "../../constants";
import flash from "../../stores/Flash";
import { history, storage } from "services";
import get from "lodash/get";
import globalConfig from "../../config";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
});

client.interceptors.request.use(function (config) {
  config.headers.Authorization =
    "Bearer " + storage.local.get(globalConfig.api.access_token_key);
  return config;
});

function clientResponseInterceptor() {
  const interceptor = client.interceptors.response.use(
    (response) => response,
    (error) => {
      networkError(error);
      if (error.response) {
        responseStatusCheck(error.response.status);
        if (error.response.status === 401) {
          client.interceptors.response.eject(interceptor);

          const refreshToken = storage.local.get(
            globalConfig.api.refresh_token_key
          );

          return axios
            .get(API_URL + "/auth/refresh", {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            })
            .then((response) => {
              const accessToken =
                get(response, "data.result.access_token") || "";
              const refreshToken =
                get(response, "data.result.refresh_token") || "";

              storage.local.set(globalConfig.api.access_token_key, accessToken);
              storage.local.set(
                globalConfig.api.refresh_token_key,
                refreshToken
              );

              error.response.config.headers[
                "Authorization"
              ] = `Bearer ${accessToken}`;
              return client(error.response.config);
            })
            .catch((error) => {
              // storage.local.remove(globalConfig.api.access_token_key);
              // storage.local.remove(globalConfig.api.refresh_token_key);
              // localStorage.removeItem("current_user");

              localStorage.clear();

              window.location.href = window.location.origin;
              return Promise.reject(error);
            })
            .finally(clientResponseInterceptor);
        }
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
