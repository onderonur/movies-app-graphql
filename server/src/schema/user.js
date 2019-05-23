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
  }

  input SignUpInput {
    firstname: String!
    lastname: String!
    username: String!
    password: String!
    passwordConfirmation: String!
  }

  type Token {
    token: String!
  }

  type UserMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    user: User
  }

  type User {
    id: ID!
    username: String!
  }
`;
