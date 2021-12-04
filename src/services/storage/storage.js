import store from "store2";
import cookie from "js-cookie";

const storageAPI = (type) => ({
  get: (key) => {
    return store[type].get(key);
  },
  set: (key, value) => {
    return store[type].set(key, value);
  },
  remove: (key) => {
    return store[type].remove(key);
  },
});

const cookieAPI = () => {
  const attributes = {
    // domain: process.env.REACT_APP_ENV !== 'development' ? '.elms.uz' : undefined,
    secure: process.env.REACT_APP_ENV !== "development",
    expires: process.env.REACT_APP_ENV !== "development" ? 1 / 24 / 4 : 1,
  };

  return {
    get: (key) => {
      return cookie.get(key);
    },
    set: (key, value, expires = attributes.expires) => {
      return cookie.set(key, value, { ...attributes, expires });
    },
    remove: (key) => {
      return cookie.remove(key, attributes);
    },
  };
};

const storage = {
  local: storageAPI("local"),
  session: storageAPI("session"),
  cookie: cookieAPI(),
};

export default storage;
