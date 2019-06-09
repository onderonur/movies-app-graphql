import gql from "graphql-tag";

export default gql`
  type MovieEdge {
    cursor: Cursor!
    node: Movie
  }

  type MovieConnection {
    edges: [MovieEdge]
    pageInfo: PageInfo!
    totalCount: Int
  }

  type Movie {
    id: ID!
    title: String!
    year: Int!
    description: String
    imageUrl: String
    youtubeId: String
    director: Director
    viewerHasLiked: Boolean!
  }

  input MovieInput {
    title: String!
    year: Int!
    description: String
    imageUrl: String
    youtubeId: String
    directorId: ID!
  }

  type MovieMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    movie: Movie
  }

  type MovieLikedMutationResponse implements MutationResponse {
    success: Boolean!
    message: String
    movieLikedStatus: MovieLikedStatus
  }

  type MovieLikedStatus {
    movieId: ID!
    viewerHasLiked: Boolean!
  }

  extend type Query {
    movies(
      before: Cursor
      after: Cursor
      first: Int
      last: Int
      title: String
    ): MovieConnection
    movie(id: ID!): Movie
  }

  extend type Mutation {
    createMovie(movie: MovieInput!): MovieMutationResponse
    updateMovie(id: ID!, movie: MovieInput!): MovieMutationResponse
    deleteMovie(id: ID!): MovieMutationResponse
    likeMovie(movieId: ID!): MovieLikedMutationResponse!
    unlikeMovie(movieId: ID!): MovieLikedMutationResponse!
  }
`;
