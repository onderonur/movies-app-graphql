// Reusability
import React, { useState, useContext } from "react";
import {
  Typography,
  DialogContent,
  IconButton,
  makeStyles
} from "@material-ui/core";
import YouTubePlayer from "components/YoutubePlayer";
import MovieLikeButton from "pages/Movies/MovieLikeButton";
import { ModalRouteContext } from "react-router-modal-gallery";
import paths from "constants/paths";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteMovieConfirmDialog from "pages/Movie/DeleteMovieConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingIndicator from "components/LoadingIndicator";
import { BaseLink } from "components/BaseComponents";
import ImageContainer from "components/ImageContainer";
import MovieGridList from "pages/Movies/MovieGridList";

const useStyles = makeStyles(theme => ({
  top: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      display: "block"
    }
  },
  main: {
    padding: "0 16px",
    flex: 1 /* IE11 fix */
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  otherMovies: {
    padding: 16
  }
}));

function MovieDetails({ movie, loading, onEditClick }) {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { redirectToBack } = useContext(ModalRouteContext);
  const classes = useStyles();

  function showDeleteConfirm() {
    setDeleteConfirmVisible(true);
  }

  function hideDeleteConfirm() {
    setDeleteConfirmVisible(false);
  }

  const otherMovies = loading
    ? []
    : movie.director.movies.filter(item => item.id !== movie.id);

  const directorLink = loading ? null : (
    <BaseLink to={`${paths.DIRECTORS}/${movie.director.id}`} toModal>
      {movie.director.name}
    </BaseLink>
  );

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <>
      <BaseDialogTitle>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Movie Details
        </Typography>
        <AccessControl allowedRoles={[roles.ADMIN]}>
          <IconButton onClick={onEditClick}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={showDeleteConfirm}>
            <DeleteIcon color="secondary" fontSize="small" />
          </IconButton>
        </AccessControl>
      </BaseDialogTitle>

      <DialogContent>
        <div className={classes.top}>
          <ImageContainer
            src={movie.imageUrl}
            alt="Movie poster"
            height={268}
            width={182}
          />
          <div className={classes.main}>
            <div className={classes.title}>
              <Typography variant="h5">{movie.title}</Typography>
              <MovieLikeButton
                movieId={movie.id}
                viewerHasLiked={movie.viewerHasLiked}
              />
            </div>

            <Typography variant="subtitle1">{directorLink}</Typography>

            <div>
              <Typography variant="h6">Overview</Typography>
              <Typography>{movie.description}</Typography>
            </div>
          </div>
        </div>

        {movie.youtubeId && <YouTubePlayer youtubeId={movie.youtubeId} />}

        <div className={classes.otherMovies}>
          {otherMovies.length ? (
            <>
              <Typography>
                {otherMovies.length
                  ? `Other movies by `
                  : `There is no other movie by `}
                {directorLink}
              </Typography>
              <MovieGridList
                direction="horizontal"
                movies={otherMovies}
                cols={2}
              />
            </>
          ) : (
            <Typography>
              {`There is no other movie by `}
              {directorLink}
            </Typography>
          )}
        </div>
      </DialogContent>

      <DeleteMovieConfirmDialog
        open={deleteConfirmVisible}
        movie={movie}
        onClose={hideDeleteConfirm}
        onCompleted={redirectToBack}
      />
    </>
  );
}

export default MovieDetails;
