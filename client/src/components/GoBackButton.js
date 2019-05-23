import React, { useContext } from "react";
import { ModalRouteContext } from "react-router-modal-gallery";
import { IconButton } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";

const GoBackButton = ({ style, onClick }) => {
  const { redirectToBack } = useContext(ModalRouteContext);

  return (
    <IconButton style={style} onClick={onClick || redirectToBack}>
      <ArrowBack fontSize="small" />
    </IconButton>
  );
};

export default GoBackButton;
