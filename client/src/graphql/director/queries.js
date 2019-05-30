import gql from "graphql-tag";

// TODO: Director'ü movie gibi fragment'a al
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
      id
      name
      bio
      imageUrl
      movies @include(if: $withMovies) {
        id
        title
        imageUrl
        viewerHasLiked
      }
    }
  }
`;
