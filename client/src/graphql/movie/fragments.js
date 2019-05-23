import gql from "graphql-tag";

export const MOVIE_FRAGMENT = gql`
  fragment movie on Movie {
    id
    title
    imageUrl
    viewerHasLiked
  }
`;
