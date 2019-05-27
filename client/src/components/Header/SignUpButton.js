import React from "react";
import { SHOW_SIGNUP_MODAL } from "graphql/cache/mutations";
import { Mutation } from "react-apollo";
import { BaseButton } from "components/BaseComponents";

function SignUpButton() {
  return (
    <Mutation mutation={SHOW_SIGNUP_MODAL}>
      {showSignUpModal => (
        <BaseButton color="inherit" onClick={showSignUpModal}>
          Sign Up
        </BaseButton>
      )}
    </Mutation>
  );
}

export default SignUpButton;
