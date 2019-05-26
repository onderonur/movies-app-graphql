// OK
import React from "react";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { SIGN_UP } from "graphql/user/mutations";
import {
  BaseTextField,
  BaseFormik,
  BaseForm,
  BaseFormActions,
  BaseDialogTitle
} from "components/BaseComponents";
import { REQUIRED_ERROR } from "constants/formErrors";
import { DialogContent, DialogActions, Typography } from "@material-ui/core";

function SignUpModal({ onCancel, onCompleted }) {
  return (
    <Mutation
      mutation={SIGN_UP}
      onCompleted={data => {
        const {
          signUp: { token }
        } = data;
        onCompleted({ variables: { token } });
      }}
    >
      {(signUp, { loading }) => (
        <BaseFormik
          initialValues={{
            firstname: "",
            lastname: "",
            username: "",
            password: "",
            passwordConfirmation: ""
          }}
          validationSchema={Yup.object().shape({
            firstname: Yup.string().required(REQUIRED_ERROR),
            lastname: Yup.string().required(REQUIRED_ERROR),
            username: Yup.string().required(REQUIRED_ERROR),
            password: Yup.string().required(REQUIRED_ERROR),
            passwordConfirmation: Yup.string()
              .required(REQUIRED_ERROR)
              .oneOf([Yup.ref("password"), null], "Passwords don't match")
          })}
          onSubmit={values => signUp({ variables: { input: values } })}
          submitting={loading}
          okText="Submit"
        >
          <BaseForm>
            <BaseDialogTitle fullScreen={false}>
              <Typography variant="h6">Sign Up</Typography>
            </BaseDialogTitle>
            <DialogContent>
              <BaseTextField
                name="firstname"
                label="Firstname"
                required
                autoFocus
                fullWidth
              />
              <BaseTextField
                name="lastname"
                label="Lastname"
                required
                fullWidth
              />
              <BaseTextField
                name="username"
                label="Username"
                required
                fullWidth
              />
              <BaseTextField
                name="password"
                label="Password"
                type="password"
                required
                fullWidth
              />
              <BaseTextField
                name="passwordConfirmation"
                label="Password Confirmation"
                type="password"
                required
                fullWidth
              />
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
}

export default SignUpModal;
