import gql from "graphql-tag";

export const DIRECTOR_FRAGMENT = gql`
  fragment director on Director {
    id
    name
    bio
    imageUrl
  }
`;
