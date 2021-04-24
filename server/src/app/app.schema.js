import gql from "graphql-tag";
import directorSchema from "../directors/director.schema";
import movieSchema from "../movies/movie.schema";
import userSchema from "../users/user.schema";
import customScalars from "../shared/customScalars.schema";

const linkSchema = gql`
  type Query {
    _: Boolean!
  }

  type Mutation {
    _: Boolean!
  }

  type Subscription {
    _: Boolean!
  }
  
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
`;

export default [
  linkSchema,
  directorSchema,
  movieSchema,
  userSchema,
  customScalars
];
