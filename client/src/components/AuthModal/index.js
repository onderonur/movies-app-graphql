import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_AUTH_MODAL_STATE } from "graphql/cache/queries";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import { HIDE_AUTH_MODAL, STORE_USER_INFO } from "graphql/cache/mutations";
import { BaseDialog } from "components/BaseComponents";

const LOGIN = "LOGIN";
const SIGNUP = "SIGNUP";

function AuthModal() {
  return (
    <Query query={GET_AUTH_MODAL_STATE}>
      {({
        data: {
          authModal: { open, mode }
        }
      }) => (
        <Mutation mutation={HIDE_AUTH_MODAL}>
          {hideAuthModal => (
            <BaseDialog
              open={open}
              fullScreen={false}
              hideCloseButton
              onClose={hideAuthModal}
            >
              <Mutation mutation={STORE_USER_INFO}>
                {storeUserInfo => {
                  const sharedProps = {
                    open,
                    onCancel: hideAuthModal,
                    onCompleted: storeUserInfo
                  };

                  switch (mode) {
                    case LOGIN:
                      return <LoginForm {...sharedProps} />;
                    case SIGNUP:
                      return <SignUpForm {...sharedProps} />;
                    default:
                      return null;
                  }
                }}
              </Mutation>
            </BaseDialog>
          )}
        </Mutation>
      )}
    </Query>
  );
}

export default AuthModal;
