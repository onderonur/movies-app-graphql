// OK
import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import MovieLikeButton from "./MovieLikeButton";
import paths from "constants/paths";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";

function MovieListItem({ movie }) {
  return (
    <>
      <ListItem
        button
        to={`${paths.MOVIES}/${movie.id}`}
        component={AdapterModalLink}
        divider
      >
        <ListItemAvatar>
          {movie.imageUrl ? (
            <Avatar src={movie.imageUrl} />
          ) : (
            <Avatar>
              <ImageIcon />
            </Avatar>
          )}
        </ListItemAvatar>

        <ListItemText
          primary={<Typography color="primary">{movie.title}</Typography>}
          secondary={
            movie.director ? (
              <Typography>{movie.director.name}</Typography>
            ) : null
          }
        />

        <ListItemSecondaryAction>
          <MovieLikeButton
            movieId={movie.id}
            viewerHasLiked={movie.viewerHasLiked}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
}

export default MovieListItem;
