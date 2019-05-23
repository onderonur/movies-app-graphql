// OK
// TODO: https://material-ui.com/demos/snackbars/#don-39-t-block-the-floating-action-button
import React from "react";
import { ModalLink } from "react-router-modal-gallery";
import StyledFab from "styled/StyledFab";
import StyledBox from "styled/StyledBox";

const FloatingButton = ({ children, ...fabProps }) => (
  <StyledBox
    styled={{
      display: "flex",
      justifyContent: "flex-end"
    }}
  >
    <StyledFab {...fabProps} component={ModalLink}>
      {children}
    </StyledFab>
  </StyledBox>
);

export default FloatingButton;
