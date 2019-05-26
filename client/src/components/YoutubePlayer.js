// OK
import React from "react";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  container: {
    position: "relative",
    paddingBottom: "56.25%" /* 16:9 */,
    paddingTop: 25,
    height: 0
  },
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
    <div className={classes.container}>
      <iframe
        className={classes.player}
        /* Key is added to unmount the iframe everytime youtubeId changes. Otherwise, iframe messes up with the browser history. */
        key={youtubeId}
        title="youtubePlayer"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
        allowFullScreen
      />
    </div>
  );
}

export default YouTubePlayer;
