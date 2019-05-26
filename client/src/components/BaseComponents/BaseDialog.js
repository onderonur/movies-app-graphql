// OK
import React, { useState, useEffect } from "react";
import { Dialog, withMobileDialog, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  closeIcon: {
    color: "#fafafa"
  },
  closeButtonContainer: {
    position: "fixed",
    top: 4,
    right: 4
  }
}));

function CloseButton({ onClick }) {
  const classes = useStyles();

  return (
    <div className={classes.closeButtonContainer}>
      <IconButton className={classes.closeIcon} onClick={onClick}>
        <CloseIcon />
      </IconButton>
    </div>
  );
}

function BaseDialog({
  open,
  onClose,
  onExited,
  fullScreen,
  scroll = "body",
  hideCloseButton,
  children,
  ...rest
}) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  function startExitAnimation() {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  }

  function onExitAnimationEnd() {
    if (onExited) {
      onExited();
    }
  }

  return (
    <Dialog
      {...rest}
      scroll={scroll}
      fullScreen={fullScreen}
      open={showModal}
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
    >
      {children}
      {!hideCloseButton && !fullScreen && (
        <CloseButton onClick={startExitAnimation} />
      )}
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
