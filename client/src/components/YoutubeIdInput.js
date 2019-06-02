// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import YouTubePlayer from "components/YoutubePlayer";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  preview: {
    marginTop: theme.spacing(1)
  }
}));

function YoutubeIdInput({
  name,
  label,
  fullWidth,
  required,
  margin,
  youtubeId
}) {
  const classes = useStyles();

  return (
    <>
      <BaseTextField
        name={name}
        label={label}
        fullWidth={fullWidth}
        required={required}
        margin={margin}
      />
      <div className={classes.preview}>
        <YouTubePlayer youtubeId={youtubeId} />
      </div>
    </>
  );
}

export default YoutubeIdInput;
