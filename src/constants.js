import { getLanguages } from "./common/utils/utils";

export const API_BASE_URL = `https://api-elms.tuit.uz/api/student`;
export const API_URL = `https://api-elms.tuit.uz/api`;
export const CURRENT_LANG = "oz";
export const LANGUAGES = getLanguages;
export const ACCESS_TOKEN = "access_token";
export const DATE_FORMATS = {
  DMY: "DD-MM-YYYY",
  YMD: "YYYY-MM-DD",
  Y: "Y",
  DMY_D: "DD.MM.YYYY",
};

export const PAGE_SIZE = 15;
