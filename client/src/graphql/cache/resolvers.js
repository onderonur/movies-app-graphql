import { GET_NOTIFICATIONS, GET_DARK_THEME } from "./queries";
import {
  NotificationInfo,
  UserInfo,
  AuthModalState
} from "constants/graphTypes";
import localStorageKeys from "constants/localStorageKeys";
import { storeToLocalStorage, removeFromLocalStorage, decodeJWT } from "utils";
import gql from "graphql-tag";

export function pushNotificationToCache(cache, message) {
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
}

export function showAuthModal(cache, mode) {
  const data = {
    authModal: {
      __typename: AuthModalState,
      open: true,
      mode
    }
  };

  cache.writeData({ data });
}

// TODO: Bunun apollo'dan gelen hazırı varsa onu kullan. Bi bak.
export function getCacheKey(__typename, id) {
  return `${__typename}:${id}`;
}

function getDeletedFlag(cache, __typename, id, fragment) {
  // TODO: Buradaki exception için daha iyi bi yöntem var mı bak?
  // Cache'de ilgili alanı bulamayınca patlıyo yoksa (new director oluştur mesela, refetch'ler patlıyo)
  try {
    const cachedData = cache.readFragment({
      id: getCacheKey(__typename, id),
      fragment: fragment
    });

    return cachedData.__deleted;
  } catch (err) {
    return null;
  }
}

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

      cache.writeData({
        data: newData
      });

      return notifications[0];
    },
    storeUserInfo: (parent, { token }, { client, cache }) => {
      const decodedToken = decodeJWT(token);

      const userInfo = {
        ...decodedToken,
        token
      };

      // Sometimes, you may want to reset the store entirely, such as when a user logs
      // out. To accomplish this, use client.resetStore to clear out your Apollo cache.
      // Since client.resetStore also refetches any of your active queries for you,
      // it is asynchronous.

      // If you want to clear the store but don’t want to refetch active queries,
      // use client.clearStore() instead of client.resetStore().
      client.resetStore();

      storeToLocalStorage(localStorageKeys.userInfo, userInfo);

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
      client.resetStore();

      removeFromLocalStorage(localStorageKeys.userInfo);

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
      const data = {
        authModal: {
          __typename: AuthModalState,
          open: false,
          mode: null
        }
      };

      client.writeData({ data });

      return null;
    },
    toggleDarkTheme: (parent, args, { client }) => {
      const cacheData = client.readQuery({ query: GET_DARK_THEME });
      const data = {
        darkTheme: !cacheData.darkTheme
      };

      storeToLocalStorage(localStorageKeys.darkTheme, data);

      client.writeData({ data });
    }
  },
  Movie: {
    __deleted: ({ id }, args, { cache }) => {
      return getDeletedFlag(
        cache,
        "Movie",
        id,
        gql`
          fragment movieDeleted on Movie {
            id
            __deleted @client
          }
        `
      );
    }
  },
  Director: {
    __deleted: ({ id }, args, { cache }) => {
      return getDeletedFlag(
        cache,
        "Director",
        id,
        gql`
          fragment directorDeleted on Director {
            id
            __deleted @client
          }
        `
      );
    }
  }
};

export default resolvers;
