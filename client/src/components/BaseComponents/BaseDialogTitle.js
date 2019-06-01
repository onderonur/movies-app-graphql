// OK!!
import React, { useContext } from "react";
import { DialogTitle, makeStyles, Typography } from "@material-ui/core";
import BaseDialogCloseButton from "./BaseDialogCloseButton";
import { BaseDialogContext } from "./BaseDialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  },
  title: {
    flex: 1
  }
}));

function BaseDialogTitle({
  showBackButton,
  onBackButtonClick,
  children,
  extra
}) {
  const classes = useStyles();
  const { fullScreen } = useContext(BaseDialogContext);

  return (
    <DialogTitle disableTypography className={classes.root}>
      {showBackButton || fullScreen ? (
        <BaseDialogCloseButton onClick={onBackButtonClick} />
      ) : null}

      {typeof children === "string" ? (
        <Typography variant="h6" className={classes.title}>
          {children}
        </Typography>
      ) : (
        children
      )}
      {extra}
    </DialogTitle>
  );
}

export default BaseDialogTitle;
