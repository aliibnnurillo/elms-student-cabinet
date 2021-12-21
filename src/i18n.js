import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import { API_URL } from "./constants";
import { getToken, getUser, isExistUser } from "./common/utils/utils";
import moment from "moment";
import "moment/locale/uz"; // for uzc
import "moment/locale/ru"; // for ru
import "moment/locale/uz-latn"; // for uz

const allowedLanguages = ["ru", "oz", "uz", "en"];

const defaultLng = "oz";
let lng = defaultLng;

const storageLanguage = isExistUser() ? getUser().default_language : "oz";
if (storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
  lng = storageLanguage;
}

i18n.on("languageChanged", function (lng) {
  moment.locale(lng === "oz" || lng === "qq" ? "uz-latn" : lng);
});

i18n
  .use(HttpApi)
  .use(initReactI18next)
  .init({
    lng,
    ns: ["cabinet"],
    defaultNS: "cabinet",
    fallbackLng: lng,
    debug: false,
    keySeparator: false,
    backend: {
      loadPath: `${API_URL}/crm/i18n/list?language={{lng}}&category={{ns}}`,
      // addPath: `${API_URL}/crm/i18n`,
      parsePayload: function (namespace, key, fallbackValue) {
        return {
          key: key,
          category: namespace,
          values: [{ language: lng, message: key }],
        };
      },
      allowMultiLoading: false,
      parse: function (data) {
        return JSON.parse(data).result;
      },
      customHeaders: {
        authorization: "Bearer " + getToken(),
      },
    },
    // saveMissing: true,
    react: {
      wait: true,
      useSuspense: true,
    },
  });

export default i18n;
