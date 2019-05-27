// OK
// TODO: https://material-ui.com/demos/snackbars/#don-39-t-block-the-floating-action-button
import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    justifyContent: "flex-end"
  },
  fab: {
    position: "fixed",
    right: 20,
    bottom: 20,
    zIndex: theme.zIndex.appBar
  }
}));

function FloatingButton({ children, ...fabProps }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Fab className={classes.fab} size="large" {...fabProps}>
        {children}
      </Fab>
    </div>
  );
}

export default FloatingButton;
