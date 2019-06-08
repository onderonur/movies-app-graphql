// OK!!
import React from "react";
import { BaseTextField, BaseImage } from "components/BaseComponents";
import { Box } from "@material-ui/core";

function ImageUrlInput({ name, label, fullWidth, required, margin, imgSrc }) {
  return (
    <>
      <BaseTextField
        name={name}
        label={label}
        fullWidth={fullWidth}
        required={required}
        margin={margin}
      />
      <Box width="50%" my={2} mx="auto">
        <BaseImage src={imgSrc} />
      </Box>
    </>
  );
}

export default ImageUrlInput;
