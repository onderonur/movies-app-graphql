import React from "react";
import {
  BaseFormik,
  BaseForm,
  BaseTextField,
  BaseFormActions
} from "./BaseComponents";
import {
  Grid,
  Box,
  Paper,
  makeStyles,
  Typography,
  Container
} from "@material-ui/core";
import * as Yup from "yup";
import { REQUIRED_ERROR } from "constants/formErrors";
import { Mutation } from "react-apollo";
import { CHANGE_PASSWORD } from "graphql/user/mutations";
import useNotifier from "hooks/useNotifier";

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    marginTop: theme.spacing(1)
  }
}));

function ChangePasswordForm() {
  const classes = useStyles();
  const { pushNotification } = useNotifier();

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" align="center">
          Change Password
        </Typography>
        <Mutation
          mutation={CHANGE_PASSWORD}
          onCompleted={data => {
            const {
              changePassword: { message }
            } = data;

            if (message) {
              pushNotification({ variables: { message } });
            }
          }}
        >
          {(changePassword, { loading }) => {
            return (
              <BaseFormik
                enableReinitialize
                initialValues={{
                  currentPassword: "",
                  newPassword: "",
                  newPasswordConfirmation: ""
                }}
                validationSchema={Yup.object().shape({
                  currentPassword: Yup.string().required(REQUIRED_ERROR),
                  newPassword: Yup.string().required(REQUIRED_ERROR),
                  newPasswordConfirmation: Yup.string()
                    .required(REQUIRED_ERROR)
                    .oneOf(
                      [Yup.ref("newPassword"), null],
                      "Passwords don't match"
                    )
                })}
                onSubmit={(values, { resetForm }) => {
                  changePassword({
                    variables: { input: values }
                  }).finally(() => {
                    resetForm();
                  });
                }}
              >
                <BaseForm className={classes.form}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <BaseTextField
                        name="currentPassword"
                        label="Current Password"
                        required
                        autoFocus
                        fullWidth
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BaseTextField
                        name="newPassword"
                        label="New Password"
                        required
                        fullWidth
                        type="password"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <BaseTextField
                        name="newPasswordConfirmation"
                        label="New Password Confirmation"
                        required
                        fullWidth
                        type="password"
                      />
                    </Grid>
                  </Grid>
                  <Box display="flex" justifyContent="flex-end" my={1}>
                    <BaseFormActions isSubmitting={loading} />
                  </Box>
                </BaseForm>
              </BaseFormik>
            );
          }}
        </Mutation>
      </Paper>
    </Container>
  );
}

export default ChangePasswordForm;
