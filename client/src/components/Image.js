// OK!!
import React from "react";
import { makeStyles } from "@material-ui/styles";
import placeholderPng from "assets/placeholder.png";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    maxHeight: ({ maxHeight }) => maxHeight
  }
}));

function Image({ className, src, alt = "Not Loaded", maxHeight = "none" }) {
  const classes = useStyles({ maxHeight });

  return (
    <img
      className={clsx(classes.img, className)}
      src={/*src ||*/ placeholderPng}
      alt={alt}
    />
  );
}

export default Image;
