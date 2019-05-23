import gql from "graphql-tag";

// It is recommended to use a "operation name"
// e.g., "CreateDirector" after the operation keyword "mutation"
export const CREATE_DIRECTOR = gql`
  mutation CreateDirector($director: DirectorInput!) {
    createDirector(director: $director) {
      success
      message
      director {
        id
      }
    }
  }
`;

export const UPDATE_DIRECTOR = gql`
  mutation UpdateDirector($id: ID!, $director: DirectorInput!) {
    updateDirector(id: $id, director: $director) {
      success
      message
      director {
        id
        name
      }
    }
  }
`;

export const DELETE_DIRECTOR = gql`
  mutation DeleteDirector($directorId: ID!) {
    deleteDirector(id: $directorId) {
      success
      message
    }
  }
`;
