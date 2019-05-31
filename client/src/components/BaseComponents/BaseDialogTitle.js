// OK!!
import React, { useContext } from "react";
import { DialogTitle, makeStyles, Typography } from "@material-ui/core";
import BaseDialogCloseButton from "./BaseDialogCloseButton";
import { BaseDialogContext } from "./BaseDialog";

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}));

function BaseDialogTitle({ showBackButton, onBackButtonClick, children }) {
  const classes = useStyles();
  const { fullScreen } = useContext(BaseDialogContext);

  return (
    <DialogTitle disableTypography className={classes.title}>
      {showBackButton || fullScreen ? (
        <BaseDialogCloseButton onClick={onBackButtonClick} />
      ) : null}

      {typeof children === "string" ? (
        <Typography variant="h5">{children}</Typography>
      ) : (
        children
      )}
    </DialogTitle>
  );
}

export default BaseDialogTitle;
