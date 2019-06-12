import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
}));

function BaseButton({ loading, disabled, children, ...props }) {
  const classes = useStyles();

  return (
    <Button {...props} disabled={loading || disabled}>
      {children}
      {loading && <CircularProgress size={24} className={classes.loading} />}
    </Button>
  );
}

export default BaseButton;
