// OK
import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const StyledCircularProgress = styled(CircularProgress)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -12px;
  margin-left: -12px;
`;

const BaseButton = ({ loading, disabled, children, ...props }) => (
  <Button {...props} disabled={loading || disabled}>
    {children}
    {loading && <StyledCircularProgress size={24} />}
  </Button>
);

export default BaseButton;
