import { decodeData, encodeData } from "./jwt";

export const saveData = (key, value) => {
  try {
    const encryptedData = encodeData(value);
    window.localStorage.setItem(key, encryptedData);
  } catch (error) {}
};

export const getData = (key) => {
  try {
    const localEncryptedData = window.localStorage.getItem(key);

    if (localEncryptedData) {
      return decodeData(localEncryptedData);
    }
  } catch (error) {
    return "";
  }
};

export const removeData = (key) => {
  try {
    window.localStorage.removeItem(key);
  } catch (error) {}
};

export const updateData = (key, value) => {
  try {
    removeData(key);
    saveData(key, value);
  } catch (error) {}
};

export const removeAll = () => {
  try {
    window.localStorage.clear();
  } catch (error) {}
};

export const getSessionIdFromCookies = (cookieName) => {
  const name = cookieName + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length, cookie.length);
    }
  }
  return null;
};
