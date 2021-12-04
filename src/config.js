const ENV = process.env;

const config = {
  app: {
    env: ENV.REACT_APP_ENV,
    version: ENV.REACT_APP_VERSION,
    isBeta: !!ENV.REACT_APP_IS_BETA,
    isDev: ENV.REACT_APP_ENV !== "production",
    confirmTime: 35000,
  },
  api: {
    base_url: ENV.REACT_APP_API_BASE_URL,
    root_url: ENV.REACT_APP_API_ROOT_URL,
    access_token_key: "access_token",
    temp_access_token_key: "temp_access_token",
    refresh_token_key: "refresh_token",
  },
};

export default config;
