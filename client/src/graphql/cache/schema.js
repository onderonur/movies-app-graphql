import gql from "graphql-tag";

const schema = gql`
  extend type Query {
    notifications: [NotificationInfo]!
    userInfo: UserInfo
    authModal: AuthModalState!
  }

  extend type Mutation {
    pushNotification(message: String!): [NotificationInfo]!
    shiftNotifications: NotificationInfo!

    storeUserInfo(token: String!): UserInfo!
    clearUserInfo: UserInfo

    showLoginModal: Boolean
    showSignUpModal: Boolean
    hideAuthModal: Boolean
  }

  type AuthModalState {
    open: Boolean!
    mode: AuthModalMode
  }

  enum AuthModalMode {
    LOGIN
    SIGNUP
  }

  type UserInfo {
    id: Int!
    exp: Int!
    iat: Int!
    token: String!
    username: String!
    role: Role
  }

  enum Role {
    ADMIN
  }

  type NotificationInfo {
    message: String!
  }

  type Movie {
    __deleted: Boolean
  }

  type Director {
    __deleted: Boolean
  }
`;

export default schema;
