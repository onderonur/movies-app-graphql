// OK
import React from "react";
import { DialogTitle, withMobileDialog } from "@material-ui/core";
import styled from "styled-components";
import CloseDialogButton from "components/CloseDialogButton";

const StyledDialogTitle = styled(DialogTitle)`
  && {
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${props => props.theme.palette.divider};
    padding: ${props => props.theme.spacing.unit}px
      ${props => props.theme.spacing.unit * 2}px;
  }
`;

const BaseDialogTitle = ({
  showBackButton,
  onBackButtonClick,
  fullScreen,
  children
}) => (
  <StyledDialogTitle disableTypography>
    {showBackButton || fullScreen ? (
      <CloseDialogButton style={{ marginRight: 8 }} onClick={onBackButtonClick} />
    ) : null}
    {children}
  </StyledDialogTitle>
);

export default withMobileDialog()(BaseDialogTitle);
