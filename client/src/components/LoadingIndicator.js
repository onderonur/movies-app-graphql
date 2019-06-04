// OK!!
import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Box } from "@material-ui/core";

function LoadingIndicator() {
  return (
    <Box
      display="flex"
      flex={1}
      justifyContent="center"
      alignItems="center"
      m={2}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingIndicator;
