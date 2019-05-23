import gql from "graphql-tag";

export const GET_NOTIFICATIONS = gql`
  query GetNotifications {
    notifications @client {
      message
    }
  }
`;

export const GET_USER_INFO = gql`
  query GetUserInfo {
    userInfo @client {
      id
      username
      role
      token
    }
  }
`;

export const GET_AUTH_MODAL_STATE = gql`
  query GetAuthModalState {
    uiState @client {
      authModal {
        open
        mode
      }
    }
  }
`;
