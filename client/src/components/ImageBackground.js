import React from "react";
import { makeStyles } from "@material-ui/styles";

// TODO: Bunu düz div içinde img'ye çevir
const useStyles = makeStyles(theme => ({
  imgBackground: {
    width: "100%",
    height: "100%",
    backgroundImage: ({ imageUrl }) => `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
}));

function ImageBackground({ imageUrl }) {
  const classes = useStyles({ imageUrl });

  return <div className={classes.imgBackground} />;
}

export default ImageBackground;
