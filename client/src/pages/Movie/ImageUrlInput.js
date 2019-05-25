// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import StyledImageContainer from "styled/StyledImageContainer";

const ImageUrlInput = ({ name, label, fullWidth, required, imgSrc }) => (
  <>
    <BaseTextField
      name={name}
      label={label}
      fullWidth={fullWidth}
      required={required}
    />
    <StyledImageContainer
      src={imgSrc}
      alt="Image input preview"
      styled={{
        height: "268px",
        width: "182px",
        padding: "6px"
      }}
    />
  </>
);

export default ImageUrlInput;
