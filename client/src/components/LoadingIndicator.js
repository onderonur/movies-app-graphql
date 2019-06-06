// OK!!
import React from "react";
import { Box, CircularProgress } from "@material-ui/core";

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
