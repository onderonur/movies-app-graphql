import schema from "./schema";
import resolvers from "./resolvers";
import { UserInfo, UIState, AuthModalState } from "constants/graphTypes";
import localStorageKeys from "constants/localStorageKeys";

const getUserInfo = () => {
  const userInfo = localStorage.getItem(localStorageKeys.userInfo);
  if (userInfo) {
    const json = JSON.parse(userInfo);
    return { __typename: UserInfo, ...json };
  }
  return null;
};

export const getDefaults = () => {
  return {
    notifications: [],
    userInfo: getUserInfo(),
    uiState: {
      __typename: UIState,
      authModal: {
        __typename: AuthModalState,
        open: false,
        mode: null
      }
    }
  };
};

export { resolvers, schema };
