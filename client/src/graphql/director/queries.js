import gql from "graphql-tag";
import { DIRECTOR_FRAGMENT } from "./fragment";
import { MOVIE_FRAGMENT } from "graphql/movie/fragments";

export const GET_DIRECTORS = gql`
  query GetDirectors {
    directors {
      ...director
    }
  }
  ${DIRECTOR_FRAGMENT}
`;

export const GET_DIRECTOR = gql`
  query GetDirector($id: ID!, $withMovies: Boolean!) {
    director(id: $id) {
      ...director
      bio
      movies @include(if: $withMovies) {
        ...movie
      }
    }
  }
  ${DIRECTOR_FRAGMENT}
  ${MOVIE_FRAGMENT}
`;
