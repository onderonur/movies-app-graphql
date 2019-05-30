// OK!!
import React from "react";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { SIGN_IN } from "graphql/user/mutations";
import {
  BaseTextField,
  BaseFormik,
  BaseDialogForm
} from "components/BaseComponents";
import { Link } from "@material-ui/core";
import { SHOW_SIGNUP_MODAL } from "graphql/cache/mutations";
import { REQUIRED_ERROR } from "constants/formErrors";

function LoginForm({ onCancel, onCompleted }) {
  return (
    <Mutation
      mutation={SIGN_IN}
      onCompleted={data => {
        const {
          signIn: { token }
        } = data;

        onCompleted({ variables: { token } });
      }}
    >
      {(signIn, { loading }) => (
        <BaseFormik
          initialValues={{
            username: "",
            password: ""
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required(REQUIRED_ERROR),
            password: Yup.string().required(REQUIRED_ERROR)
          })}
          onSubmit={(values, { resetForm }) => {
            signIn({ variables: values }).catch(() => {
              resetForm({
                ...values,
                password: ""
              });
            });
          }}
        >
          <BaseDialogForm
            title={"Login"}
            fullScreen={false}
            onCancel={onCancel}
            isSubmitting={loading}
            defaultActions={{
              submitText: "Submit"
            }}
          >
            <BaseTextField
              name="username"
              label="Username"
              required
              autoFocus
              fullWidth
              inputProps={{
                autoCapitalize: "none"
              }}
            />
            <BaseTextField
              name="password"
              label="Password"
              type="password"
              required
              fullWidth
              inputProps={{
                autoCapitalize: "none"
              }}
            />

            <Mutation mutation={SHOW_SIGNUP_MODAL}>
              {showSignUpModal => (
                <Link
                  component="button"
                  type="button"
                  onClick={showSignUpModal}
                >
                  Create an account
                </Link>
              )}
            </Mutation>
          </BaseDialogForm>
        </BaseFormik>
      )}
    </Mutation>
  );
}

export default LoginForm;
