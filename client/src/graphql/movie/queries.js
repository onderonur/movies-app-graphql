import gql from "graphql-tag";
import { MOVIE_FRAGMENT } from "./fragments";
import { DIRECTOR_FRAGMENT } from "graphql/director/fragment";

export const GET_MOVIES = gql`
  query GetMovies($first: Int, $after: Cursor, $title: String) {
    movies(first: $first, after: $after, title: $title) {
      edges {
        node {
          ...movie
          director {
            ...director
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
  ${DIRECTOR_FRAGMENT}
`;

export const GET_MOVIE = gql`
  query GetMovie($id: ID!) {
    movie(id: $id) {
      ...movie
      description
      youtubeId
      director {
        ...director
        movies {
          ...movie
        }
      }
    }
  }
  ${MOVIE_FRAGMENT}
  ${DIRECTOR_FRAGMENT}
`;
