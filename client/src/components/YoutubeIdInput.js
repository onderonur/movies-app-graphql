// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import YouTubePlayer from "components/YoutubePlayer";
import { Box } from "@material-ui/core";

function YoutubeIdInput({
  name,
  label,
  fullWidth,
  required,
  margin,
  youtubeId
}) {
  return (
    <>
      <BaseTextField
        name={name}
        label={label}
        fullWidth={fullWidth}
        required={required}
        margin={margin}
      />
      <Box mt={1}>
        <YouTubePlayer youtubeId={youtubeId} />
      </Box>
    </>
  );
}

export default YoutubeIdInput;
