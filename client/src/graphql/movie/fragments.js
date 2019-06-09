import gql from "graphql-tag";

export const MOVIE_FRAGMENT = gql`
  fragment movie on Movie {
    __typename
    id
    title
    year
    imageUrl
    viewerHasLiked
    __deleted @client
  }
`;
