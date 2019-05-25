import React, { useContext } from "react";
import { ModalRouteContext } from "react-router-modal-gallery";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const CloseDialogButton = ({ style, onClick }) => {
  const { redirectToBack } = useContext(ModalRouteContext);

  return (
    <IconButton style={style} onClick={onClick || redirectToBack}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

export default CloseDialogButton;
