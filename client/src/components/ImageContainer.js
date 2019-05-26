// OK
import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    margin: "auto",
    height: ({ height }) => height || "auto",
    width: ({ width }) => width || "auto",
    padding: ({ padding }) => padding || "auto"
  },
  img: {
    objectFit: "cover",
    width: "100%"
  }
}));

function ImageContainer({ alt, height, width, padding, ...imgProps }) {
  const classes = useStyles({ height, width, padding });

  return (
    <div className={classes.container}>
      <img className={classes.img} alt={alt} {...imgProps} />
    </div>
  );
}

export default ImageContainer;
