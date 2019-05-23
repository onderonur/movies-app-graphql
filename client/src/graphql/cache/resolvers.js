import { GET_NOTIFICATIONS, GET_AUTH_MODAL_STATE } from "./queries";
import {
  NotificationInfo,
  UserInfo,
  AuthModalState
} from "constants/graphTypes";
import localStorageKeys from "constants/localStorageKeys";

const decodeJWT = token =>
  JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1]))));

const storeUserInfoToStorage = userInfo => {
  const jsonString = JSON.stringify(userInfo);
  localStorage.setItem(localStorageKeys.userInfo, jsonString);
};

export const clearUserInfoFromStorage = () => {
  localStorage.clear(localStorageKeys.userInfo);
};

export const pushNotificationToCache = (cache, message) => {
  const query = GET_NOTIFICATIONS;

  const cacheData = cache.readQuery({ query });
  const { notifications } = cacheData;

  const newNotification = {
    __typename: NotificationInfo,
    message
  };

  const newData = {
    notifications: [...notifications, newNotification]
  };

  cache.writeQuery({
    query,
    data: newData
  });

  return notifications;
};

export const showAuthModal = (cache, mode) => {
  const cacheData = cache.readQuery({ query: GET_AUTH_MODAL_STATE });

  const data = {
    ...cacheData,
    uiState: {
      ...cacheData.uiState,
      authModal: {
        __typename: AuthModalState,
        open: true,
        mode
      }
    }
  };

  cache.writeData({ data });
};

const resolvers = {
  Mutation: {
    pushNotification: (parent, { message }, { cache }) => {
      const notifications = pushNotificationToCache(cache, message);

      return notifications;
    },
    shiftNotifications: (parent, args, { cache }) => {
      const query = GET_NOTIFICATIONS;

      const cacheData = cache.readQuery({ query });
      const { notifications } = cacheData;

      const newData = {
        notifications: notifications.slice(1)
      };

      cache.writeQuery({
        query,
        data: newData
      });

      return notifications[0];
    },
    storeUserInfo: (parent, { token }, { client, cache }) => {
      const userInfo = {
        ...decodeJWT(token),
        token
      };

      storeUserInfoToStorage(userInfo);

      /**
       * Sometimes, you may want to reset the store entirely, such as when a user logs
       * out. To accomplish this, use client.resetStore to clear out your Apollo cache.
       * Since client.resetStore also refetches any of your active queries for you,
       * it is asynchronous.
       *
       * If you want to clear the store but don’t want to refetch active queries,
       * use client.clearStore() instead of client.resetStore().
       */
      client.resetStore();

      // TODO: isLoggedIn alanı vs eklenebilir.
      // Bu örneğe bi bak
      // https://www.apollographql.com/docs/react/essentials/local-state.html#client-fields-resolvers
      cache.writeData({
        data: {
          userInfo: {
            __typename: UserInfo,
            ...userInfo
          }
        }
      });

      return userInfo;
    },
    clearUserInfo: (parent, args, { client, cache }) => {
      clearUserInfoFromStorage();

      client.resetStore();

      cache.writeData({
        data: {
          userInfo: null
        }
      });

      return null;
    },
    showLoginModal: (parent, args, { cache }) => {
      showAuthModal(cache, "LOGIN");

      return null;
    },
    showSignUpModal: (parent, args, { cache }) => {
      showAuthModal(cache, "SIGNUP");

      return null;
    },
    hideAuthModal: (parent, args, { client }) => {
      const cacheData = client.readQuery({ query: GET_AUTH_MODAL_STATE });

      const data = {
        ...cacheData,
        uiState: {
          ...cacheData.uiState,
          authModal: {
            __typename: AuthModalState,
            open: false,
            mode: null
          }
        }
      };

      client.writeData({ data });

      return null;
    }
  }
};

export default resolvers;
