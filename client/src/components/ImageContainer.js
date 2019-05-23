// OK
import React from "react";

const ImageContainer = ({ className, alt, ...imgProps }) => (
  <div className={className}>
    <img {...imgProps} alt={alt} />
  </div>
);

export default ImageContainer;
