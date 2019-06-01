// OK!!
import React from "react";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";
import { useModalGallery } from "react-router-modal-gallery";

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(2)
  }
}));

function BaseDialogCloseButton({ onClick }) {
  const { redirectToBack } = useModalGallery();
  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick || redirectToBack}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
}

export default BaseDialogCloseButton;
