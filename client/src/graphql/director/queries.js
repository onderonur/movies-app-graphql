import gql from "graphql-tag";

export const GET_DIRECTORS = gql`
  query GetDirectors{
    directors {
      id
      name
    }
  }
`;

export const GET_DIRECTOR = gql`
  query GetDirector($id: ID!, $withMovies: Boolean!) {
    director(id: $id) {
      id
      name
      movies @include(if: $withMovies) {
        id
        title
        imageUrl
        viewerHasLiked
      }
    }
  }
`;


