// OK!!
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import FlexImage from "components/FlexImage";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  img: {
    width: "50%",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    marginLeft: "auto",
    marginRight: "auto"
  }
}));

function ImageUrlInput({ name, label, fullWidth, required, imgSrc }) {
  const classes = useStyles();

  return (
    <>
      <BaseTextField
        name={name}
        label={label}
        fullWidth={fullWidth}
        required={required}
      />
        <FlexImage className={classes.img} src={imgSrc} />
   
    </>
  );
}

export default ImageUrlInput;
