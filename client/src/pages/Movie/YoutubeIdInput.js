// OK
import React from "react";
import { BaseTextField } from "components/BaseComponents";
import YouTubePlayer from "components/YoutubePlayer";
import StyledBox from "styled/StyledBox";

const YoutubeIdInput = ({ name, label, fullWidth, required, youtubeId }) => (
  <React.Fragment>
    <BaseTextField
      name={name}
      label={label}
      fullWidth={fullWidth}
      required={required}
    />
    <StyledBox
      styled={{
        marginTop: "6px"
      }}
    >
      <YouTubePlayer youtubeId={youtubeId} />
    </StyledBox>
  </React.Fragment>
);

export default YoutubeIdInput;
