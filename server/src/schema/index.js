import gql from "graphql-tag";
import directorSchema from "./director";
import movieSchema from "./movie";
import userSchema from "./user";
import customScalars from "./customScalars";

const linkSchema = gql`
  type PageInfo {
    startCursor: Cursor
    endCursor: Cursor
    hasPreviousPage: Boolean!
    hasNextPage: Boolean!
  }

  interface MutationResponse {
    success: Boolean!
    message: String
  }

  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }

  type Subscription {
    _: Boolean!
  }
`;

export default [
  linkSchema,
  directorSchema,
  movieSchema,
  userSchema,
  customScalars
];
