import gql from "graphql-tag";
import { DIRECTOR_FRAGMENT } from "./fragment";

export const GET_DIRECTORS = gql`
  query GetDirectors {
    directors {
      id
      name
      imageUrl
    }
  }
`;

export const GET_DIRECTOR = gql`
  query GetDirector($id: ID!, $withMovies: Boolean!) {
    director(id: $id) {
      ...director
      movies @include(if: $withMovies) {
        id
        title
        imageUrl
        viewerHasLiked
      }
    }
  }
  ${DIRECTOR_FRAGMENT}
`;
