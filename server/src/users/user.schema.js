import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    viewer: User
  }

  extend type Mutation {
    signUp(input: SignUpInput!): Token!
    signIn(username: String!, password: String!): Token!
    deleteUser(id: ID!): UserMutationResponse!
    changePassword(input: ChangePasswordInput!): PasswordMutationResponse!
  }

  input SignUpInput {
    firstname: String!
    lastname: String!
    username: String!
    password: String!
    passwordConfirmation: String!
  }

  input ChangePasswordInput {
    currentPassword: String!
    newPassword: String!
    newPasswordConfirmation: String!
  }

  type Token {
    token: String!
  }

  type UserMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    user: User
  }

  type PasswordMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
  }

  type User {
    id: ID!
    username: String!
  }
`;
