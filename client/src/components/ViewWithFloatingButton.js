import React from "react";
import FloatingButton from "./FloatingButton";
import AccessControl from "./AccessControl";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  children: {
    paddingBottom: theme.spacing(10)
  }
}));

function ViewWithFloatingButton({ children, buttonProps }) {
  const classes = useStyles();

  const { icon, allowedRolesToClick, ...rest } = buttonProps;

  const button = <FloatingButton {...rest}>{icon}</FloatingButton>;

  return (
    <>
      <div className={classes.children}>{children}</div>
      {allowedRolesToClick ? (
        <AccessControl allowedRoles={allowedRolesToClick}>
          {button}
        </AccessControl>
      ) : (
        button
      )}
    </>
  );
}

export default ViewWithFloatingButton;
