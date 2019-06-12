// OK!!
import React, { useContext } from "react";
import { DialogTitle, makeStyles, Typography, Box } from "@material-ui/core";
import BaseDialogCloseButton from "./BaseDialogCloseButton";
import { BaseDialogContext } from "./BaseDialog";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
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
      <Box display="flex" flexGrow={1} alignItems="center" minWidth={0}>
        {showBackButton || fullScreen ? (
          <BaseDialogCloseButton onClick={onBackButtonClick} />
        ) : null}

        {typeof children === "string" ? (
          <Typography variant="h6" className={classes.title} noWrap>
            {children}
          </Typography>
        ) : (
          children
        )}
      </Box>

      <Box display="flex" alignItems="center">
        {extra}
      </Box>
    </DialogTitle>
  );
}

export default BaseDialogTitle;
