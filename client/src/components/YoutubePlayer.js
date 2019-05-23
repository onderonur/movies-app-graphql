// OK
import React from "react";
import StyledBox from "styled/StyledBox";
import styled from "styled-components";

const StyledPlayer = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YouTubePlayer = ({ youtubeId }) => (
  <StyledBox
    styled={{
      position: "relative",
      paddingBottom: "56.25%" /* 16:9 */,
      paddingTop: 25,
      height: 0
    }}
  >
    <StyledPlayer
      /* Key is added to unmount the iframe everytime youtubeId changes. Otherwise, iframe messes up with the browser history. */
      key={youtubeId}
      title="youtubePlayer"
      src={`https://www.youtube.com/embed/${youtubeId}`}
      frameBorder="0"
      allowFullScreen 
    />
  </StyledBox>
);

export default YouTubePlayer;
