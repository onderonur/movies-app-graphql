// OK
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import StyledBox from "styled/StyledBox";

const LoadingIndicator = () => (
  <StyledBox styled={{ textAlign: "center" }}>
    <CircularProgress />
  </StyledBox>
);

export default LoadingIndicator;
