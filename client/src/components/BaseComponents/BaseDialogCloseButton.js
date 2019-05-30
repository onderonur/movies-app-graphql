// OK!!
import React, { useContext } from "react";
import { ModalRouteContext } from "react-router-modal-gallery";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(2)
  }
}));

function BaseDialogCloseButton({ onClick }) {
  const { redirectToBack } = useContext(ModalRouteContext);
  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick || redirectToBack}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}

export default BaseDialogCloseButton;
