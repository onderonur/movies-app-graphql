// OK!!
import React, { useState, useEffect } from "react";
import { Dialog, withMobileDialog } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  closeIcon: {
    color: theme.palette.grey[50]
  },
  closeButtonContainer: {
    position: "fixed",
    top: theme.spacing(1),
    right: theme.spacing(3),
    cursor: "pointer"
  }
}));

export const BaseDialogContext = React.createContext();

function BaseDialog({
  open,
  onClose,
  onExited,
  scroll = "body",
  fullScreen,
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
        <CloseIcon className={classes.closeIcon} onClick={startExitAnimation} />
      </div>
    );
  }

  return (
    <Dialog
      scroll={scroll}
      fullScreen={fullScreen}
      open={showModal}
      onClose={startExitAnimation}
      onExited={onExitAnimationEnd}
      {...rest}
    >
      <BaseDialogContext.Provider value={{ fullScreen }}>
        {children}
      </BaseDialogContext.Provider>
      {!hideCloseButton && !fullScreen && renderCloseButton()}
    </Dialog>
  );
}

export default withMobileDialog()(BaseDialog);
