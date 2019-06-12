import React from "react";
import * as Yup from "yup";
import { Mutation } from "react-apollo";
import { SIGN_UP } from "graphql/user/mutations";
import {
  BaseTextField,
  BaseFormik,
  BaseDialogForm
} from "components/BaseComponents";
import { REQUIRED_ERROR } from "constants/formErrors";
import { Grid } from "@material-ui/core";

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
          onSubmit={(values, { resetForm }) =>
            signUp({ variables: { input: values } }).catch(() => {
              resetForm({
                ...values,
                password: "",
                passwordConfirmation: ""
              });
            })
          }
          submitting={loading}
          confirmText="Submit"
        >
          <BaseDialogForm
            title="Sign Up"
            onCancel={onCancel}
            isSubmitting={loading}
            defaultActions={{
              submitText: "Submit"
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <BaseTextField
                  name="username"
                  label="Username"
                  autoFocus
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseTextField
                  name="firstname"
                  label="Firstname"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <BaseTextField
                  name="lastname"
                  label="Lastname"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <BaseTextField
                  name="password"
                  label="Password"
                  type="password"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <BaseTextField
                  name="passwordConfirmation"
                  label="Password Confirmation"
                  type="password"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
          </BaseDialogForm>
        </BaseFormik>
      )}
    </Mutation>
  );
}

export default SignUpModal;
