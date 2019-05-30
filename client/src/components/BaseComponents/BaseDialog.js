// OK!!
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
    right: 20
  }
}));

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
  const classes = useStyles();
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

  function renderCloseButton() {
    return (
      <div className={classes.closeButtonContainer}>
        <IconButton className={classes.closeIcon} onClick={startExitAnimation}>
          <CloseIcon />
        </IconButton>
      </div>
    );
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
      {!hideCloseButton && !fullScreen && renderCloseButton()}
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
