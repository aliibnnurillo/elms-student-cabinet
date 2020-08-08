import { ACCESS_TOKEN, LANGUAGES } from "../../constants";
import { message } from "antd";

export const saveUser = (user) => {
  localStorage.setItem("current_user", JSON.stringify(user));
};

export const setLanguages = (val) => {
  localStorage.setItem("languages", JSON.stringify(val));
};

export function getLanguages() {
  return localStorage.getItem("languages") !== null
    ? JSON.parse(localStorage.getItem("languages"))
    : [];
}

export function clearLS() {
  localStorage.clear();
}

export function isExistUser() {
  return localStorage.getItem("current_user") !== null;
}

export function getUser() {
  return JSON.parse(localStorage.getItem("current_user"));
}

export function recLang() {
  return (isExistUser() && getUser().default_language) || "oz";
}

export function removeUni() {
  localStorage.removeItem("current-uni");
}

export function extractActiveLang(list) {
  return LANGUAGES().filter((item) => list.includes(item.code));
}

export function getShortFullName(option = {}) {
  const fName = option.first_name || "";
  const lName = option.second_name || "";
  const mName = option.third_name || "";

  return (
    fName &&
    lName &&
    lName.charAt(0).toUpperCase() +
      lName.slice(1) +
      " " +
      fName.charAt(0).toUpperCase() +
      "." +
      mName.charAt(0).toUpperCase() +
      "."
  );
}

export function getLongFullName(option = {}) {
  const fName = option.first_name || "";
  const lName = option.second_name || "";
  const mName = option.third_name || "";

  return (
    fName &&
    lName &&
    lName.charAt(0).toUpperCase() +
      lName.slice(1) +
      " " +
      fName.charAt(0).toUpperCase() +
      fName.slice(1) +
      " " +
      mName.charAt(0).toUpperCase() +
      mName.slice(1)
  );
}

export function blobToImageUrl(data) {
  const urlCreator = window.URL || window.webkitURL;
  return urlCreator.createObjectURL(data);
}

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    callback(reader.result);
  });
  reader.readAsDataURL(img);
}

export function beforeUpload(file) {
  const isJpg = file.type === "image/jpeg";
  if (!isJpg) {
    message.error("You can only upload JPG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpg && isLt2M;
}

export function setToken(token) {
  window.localStorage.setItem(ACCESS_TOKEN, token);
}

export function getToken() {
  return window.localStorage.getItem(ACCESS_TOKEN);
}

export function rmToken() {
  window.localStorage.removeItem(ACCESS_TOKEN);
}

export const validToken = () => {
  return !!getToken();
};

export const groupBy = (xs, key) => {
  return xs.reduce((rv, x) => {
    (rv[x[key]] = rv[x[key]] || []).push(x[key]);
    return rv;
  }, {});
};

export function extractFirstCharacter(string = "") {
  return typeof string === "string" && string.length ? string[0] : "";
}
