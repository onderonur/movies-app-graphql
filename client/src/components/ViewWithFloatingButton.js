// OK!!
import React from "react";
import AccessControl from "./AccessControl";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  children: {
    paddingBottom: theme.spacing(10)
  },
  fab: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: theme.zIndex.appBar
  }
}));

function ViewWithFloatingButton({ children, fabProps }) {
  const classes = useStyles();

  const { icon, allowedRolesToClick, ...rest } = fabProps;

  const button = (
    <Fab className={classes.fab} size="large" {...rest}>
      {icon}
    </Fab>
  );

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
