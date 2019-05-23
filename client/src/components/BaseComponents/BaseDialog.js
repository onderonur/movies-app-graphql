// OK
import React, { useState, useEffect } from "react";
import { Dialog, withMobileDialog, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import StyledBox from "styled/StyledBox";
import styled from "styled-components";

const StyledCloseIcon = styled(CloseIcon)`
  color: #fafafa;
`;

const CloseButton = ({ onClick }) => (
  <StyledBox
    styled={{
      position: "fixed",
      top: "4px",
      right: "4px"
    }}
  >
    <IconButton onClick={onClick}>
      <StyledCloseIcon />
    </IconButton>
  </StyledBox>
);

// TODO: Bunu BaseDialog'a filan çevir
const BaseDialog = ({
  open,
  onClose,
  onExited,
  fullScreen,
  scroll = "body",
  hideCloseButton,
  children,
  ...rest
}) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(open);
  }, [open]);

  const startExitAnimation = () => {
    setShowModal(false);
    if (onClose) {
      onClose();
    }
  };

  const onExitAnimationEnd = () => {
    if (onExited) {
      onExited();
    }
  };

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
};

export default withMobileDialog()(BaseDialog);
