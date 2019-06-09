import gql from "graphql-tag";

export const STORE_USER_INFO = gql`
  mutation StoreUserInfo($token: String!) {
    storeUserInfo(token: $token) @client
  }
`;

export const CLEAR_USER_INFO = gql`
  mutation ClearUserInfo {
    clearUserInfo @client
  }
`;

export const PUSH_NOTIFICATION = gql`
  mutation PushNotification($message: String!) {
    pushNotification(message: $message) @client
  }
`;

export const SHIFT_NOTIFICATIONS = gql`
  mutation shiftNotifications {
    shiftNotifications @client {
      message
    }
  }
`;

export const SHOW_LOGIN_MODAL = gql`
  mutation ShowLoginModal {
    showLoginModal @client
  }
`;

export const SHOW_SIGNUP_MODAL = gql`
  mutation ShowSignUpModal {
    showSignUpModal @client
  }
`;

export const HIDE_AUTH_MODAL = gql`
  mutation HideAuthModal {
    hideAuthModal @client
  }
`;

export const TOGGLE_DARK_THEME = gql`
  mutation toggleDarkTheme {
    toggleDarkTheme @client
  }
`;
