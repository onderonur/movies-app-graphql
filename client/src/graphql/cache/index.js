import schema from "./schema";
import resolvers from "./resolvers";
import { UserInfo, AuthModalState } from "constants/graphTypes";
import localStorageKeys from "constants/localStorageKeys";

function readFromLocalStorage(key) {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  }
  return null;
}

function getUserInfo() {
  const userInfo = readFromLocalStorage(localStorageKeys.userInfo);
  if (userInfo) {
    return { __typename: UserInfo, ...userInfo };
  }
  return null;
}

function getDarkTheme() {
  const data = readFromLocalStorage(localStorageKeys.darkTheme);
  if (data) {
    return data.darkTheme;
  }
  return false;
}

export function getDefaults() {
  return {
    notifications: [],
    userInfo: getUserInfo(),
    authModal: {
      __typename: AuthModalState,
      open: false,
      mode: null
    },
    darkTheme: getDarkTheme()
  };
}

export { resolvers, schema };
