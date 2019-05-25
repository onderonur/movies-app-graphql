import gql from "graphql-tag";
import { MOVIE_FRAGMENT } from "./fragments";

export const GET_MOVIES = gql`
  query GetMovies($after: Cursor) {
    movies(first: 5, after: $after) {
      edges {
        node {
          ...movie
          director {
            id
            name
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      ...movie
      description
      youtubeId
      director {
        id
        name
        movies {
          ...movie
        }
      }
    }
  }
  ${MOVIE_FRAGMENT}
`;
