// Reusability
import React, { useState } from "react";
import {
  Typography,
  DialogContent,
  IconButton,
  makeStyles,
  Grid
} from "@material-ui/core";
import YouTubePlayer from "components/YoutubePlayer";
import MovieLikeButton from "pages/Movies/MovieLikeButton";
import paths from "constants/paths";
import { BaseDialogTitle, BaseGridList } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteMovieConfirmDialog from "pages/Movie/DeleteMovieConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingIndicator from "components/LoadingIndicator";
import { BaseLink } from "components/BaseComponents";
import ImageBox from "components/ImageBox";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";

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
  const { redirectToBack } = useModalGallery();
  const classes = useStyles();

  function showDeleteConfirm() {
    setDeleteConfirmVisible(true);
  }

  function hideDeleteConfirm() {
    setDeleteConfirmVisible(false);
  }

  const director = movie ? movie.director : null;

  const otherMovies = loading
    ? []
    : director.movies.filter(item => item.id !== movie.id);

  const directorLink = loading ? null : (
    <BaseLink to={`${paths.DIRECTORS}/${director.id}`} toModal>
      {director.name}
    </BaseLink>
  );

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <>
      <BaseDialogTitle
        extra={
          <AccessControl allowedRoles={[roles.ADMIN]}>
            <IconButton onClick={onEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={showDeleteConfirm}>
              <DeleteIcon color="secondary" fontSize="small" />
            </IconButton>
          </AccessControl>
        }
      >
        Movie Details
      </BaseDialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ImageBox src={movie.imageUrl} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <div className={classes.title}>
              <Typography variant="h5">{movie.title}</Typography>
              <MovieLikeButton
                movieId={movie.id}
                viewerHasLiked={movie.viewerHasLiked}
              />
            </div>
            <Typography variant="subtitle1">{directorLink}</Typography>
            <Typography variant="h6">Overview</Typography>
            <Typography>{movie.description}</Typography>
          </Grid>

          {movie.youtubeId && (
            <Grid item xs={12}>
              <YouTubePlayer youtubeId={movie.youtubeId} />
            </Grid>
          )}

          <Grid item xs={12}>
            {otherMovies.length ? (
              <>
                <Typography>
                  {otherMovies.length
                    ? `Other movies by `
                    : `There is no other movie by `}
                  {directorLink}
                </Typography>
                <BaseGridList
                  items={director.movies}
                  direction="horizontal"
                  renderItem={({ item }) => (
                    <MovieGridListTile key={item.id} movie={item} />
                  )}
                />
              </>
            ) : (
              <Typography>
                {`There is no other movie by `}
                {directorLink}
              </Typography>
            )}
          </Grid>
        </Grid>

        <div className={classes.otherMovies} />
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
