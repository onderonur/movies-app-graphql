// OK
import React from "react";
import { DialogTitle, withMobileDialog, makeStyles } from "@material-ui/core";
import CloseDialogButton from "components/CloseDialogButton";

const useStyles = makeStyles(theme => ({
  title: {
    display: "flex",
    alignItems: "center",
    borderBottom: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`
  }
}));

function BaseDialogTitle({
  showBackButton,
  onBackButtonClick,
  fullScreen,
  children
}) {
  const classes = useStyles();

  return (
    <DialogTitle disableTypography className={classes.title}>
      {showBackButton || fullScreen ? (
        <CloseDialogButton
          style={{ marginRight: 8 }}
          onClick={onBackButtonClick}
        />
      ) : null}
      {children}
    </DialogTitle>
  );
}

export default withMobileDialog()(BaseDialogTitle);
