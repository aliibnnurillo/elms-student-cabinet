import { getLanguages, recLang } from './common/utils/utils';

export const API_BASE_URL = `http://backend.elms.uz/api/student`;
export const API_URL = `http://backend.elms.uz/api`;
export const CURRENT_LANG = recLang;
export const LANGUAGES = getLanguages;
export const ACCESS_TOKEN = 'access_token';
export const ACTIVE_MENU_KEY = 'active_menu_key';
export const DATE_FORMATS = {
  DMY: 'DD-MM-YYYY',
  YMD: 'YYYY-MM-DD',
  Y: 'Y',
  DMY_D: 'DD.MM.YYYY',
};

export const PAGE_SIZE = 15;
