import React from "react";
import { makeStyles } from "@material-ui/styles";
import AspectRatio from "./AspectRatio";

const useStyles = makeStyles(theme => ({
  player: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%"
  }
}));

function YouTubePlayer({ youtubeId }) {
  const classes = useStyles();

  return (
    <AspectRatio aspectRatio="16:9">
      <iframe
        className={classes.player}
        // Key is added to unmount the iframe everytime youtubeId changes. Otherwise, iframe messes up with the browser history.
        key={youtubeId}
        title="youtubePlayer"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allowFullScreen
      />
    </AspectRatio>
  );
}

export default YouTubePlayer;
