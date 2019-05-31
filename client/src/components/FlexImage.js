import React from "react";
import { makeStyles } from "@material-ui/styles";
import placeholderPng from "assets/placeholder.png";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  container: {
    height: "100%"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

function FlexImage({ className, src }) {
  const classes = useStyles({ src });

  return (
    <div className={clsx(classes.container, className)}>
      <img
        className={classes.img}
        src={src || placeholderPng}
        alt={"Not Loaded"}
      />
    </div>
  );
}

export default FlexImage;
