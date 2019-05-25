// OK
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import StyledBox from "styled/StyledBox";

const LoadingIndicator = () => (
  <StyledBox styled={{ textAlign: "center" }}>
    <CircularProgress size={60}/>
  </StyledBox>
);

export default LoadingIndicator;
