// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import ImageContainer from "components/ImageContainer";

function ImageUrlInput({ name, label, fullWidth, required, imgSrc }) {
  return (
    <>
      <BaseTextField
        name={name}
        label={label}
        fullWidth={fullWidth}
        required={required}
      />
      <ImageContainer
        src={imgSrc}
        alt="Image input preview"
        height={268}
        width={182}
        padding={6}
      />
    </>
  );
}

export default ImageUrlInput;
