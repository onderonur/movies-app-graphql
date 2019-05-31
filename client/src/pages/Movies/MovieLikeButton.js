// OK!!
import React from "react";
import { Checkbox, makeStyles } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import MovieLikeMutation from "./MovieLikeMutation";

const useStyles = makeStyles(theme => ({
  star: ({ viewerHasLiked }) => ({
    color: viewerHasLiked ? "#e4bb24" : "#b4b4b4"
  })
}));

function MovieLikeButton({ movieId, viewerHasLiked }) {
  const classes = useStyles({ viewerHasLiked });

  const star = <StarIcon className={classes.star} />;

  return (
    <MovieLikeMutation movieId={movieId} viewerHasLiked={viewerHasLiked}>
      {mutation => (
        <Checkbox
          color="default"
          icon={star}
          checkedIcon={star}
          checked={viewerHasLiked}
          onChange={mutation}
        />
      )}
    </MovieLikeMutation>
  );
}

export default MovieLikeButton;
