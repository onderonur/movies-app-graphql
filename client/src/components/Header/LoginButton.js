import React from "react";
import { Mutation } from "react-apollo";
import { SHOW_LOGIN_MODAL } from "graphql/cache/mutations";
import { BaseButton } from "components/BaseComponents";

function LoginButton() {
  return (
    <Mutation mutation={SHOW_LOGIN_MODAL}>
      {showLoginModal => (
        <BaseButton
          color="inherit"
          onClick={() => {
            showLoginModal();
          }}
        >
          Login
        </BaseButton>
      )}
    </Mutation>
  );
}

export default LoginButton;
