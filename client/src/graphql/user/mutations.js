import gql from "graphql-tag";

export const SIGN_IN = gql`
  mutation SignIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      token
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;
