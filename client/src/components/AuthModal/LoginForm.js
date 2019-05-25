// OK
import React from "react";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { SIGN_IN } from "graphql/user/mutations";
import {
  BaseTextField,
  BaseFormik,
  BaseForm,
  BaseFormActions,
  BaseDialogTitle
} from "components/BaseComponents";
import {
  Link,
  DialogContent,
  DialogActions,
  Typography
} from "@material-ui/core";
import { SHOW_SIGNUP_MODAL } from "graphql/cache/mutations";
import { REQUIRED_ERROR } from "constants/formErrors";
import StyledBox from "styled/StyledBox";

const LoginForm = ({ onCancel, onCompleted }) => (
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
        onSubmit={values => signIn({ variables: values })}
      >
        <BaseForm>
          <BaseDialogTitle fullScreen={false}>
            <Typography variant="h6">Login</Typography>
          </BaseDialogTitle>
          <DialogContent>
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
                <StyledBox styled={{ marginTop: "20px" }}>
                  <Link
                    component="button"
                    type="button"
                    onClick={showSignUpModal}
                  >
                    Create an account
                  </Link>
                </StyledBox>
              )}
            </Mutation>
          </DialogContent>

          <DialogActions>
            <BaseFormActions
              isSubmitting={loading}
              onCancel={onCancel}
              submitText="Submit"
            />
          </DialogActions>
        </BaseForm>
      </BaseFormik>
    )}
  </Mutation>
);

export default LoginForm;
