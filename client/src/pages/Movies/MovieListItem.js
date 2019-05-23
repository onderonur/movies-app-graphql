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
import { ModalLink } from "react-router-modal-gallery";

const MovieListItem = ({ movie }) => (
  <React.Fragment>
    <ListItem
      button
      to={`${paths.MOVIES}/${movie.id}`}
      component={ModalLink}
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
        primary={
          <Typography color="primary" noWrap>
            {movie.title}
          </Typography>
        }
        secondary={
          movie.director ? (
            <Typography noWrap>{movie.director.name}</Typography>
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
  </React.Fragment>
);

export default MovieListItem;
