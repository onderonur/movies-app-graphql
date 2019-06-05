import gql from "graphql-tag";

export const DIRECTOR_FRAGMENT = gql`
  fragment director on Director {
    __typename
    id
    name
    imageUrl
    __deleted @client
  }
`;
