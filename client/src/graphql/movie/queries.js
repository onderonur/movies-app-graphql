import gql from "graphql-tag";
import { MOVIE_FRAGMENT } from "./fragments";

export const GET_MOVIES = gql`
  query GetMovies($first: Int, $after: Cursor, $title: String) {
    movies(first: $first, after: $after, title: $title) {
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
