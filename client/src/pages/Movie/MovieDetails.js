// Reusability
import React, { useState, useContext } from "react";
import { Typography, Link, DialogContent, IconButton } from "@material-ui/core";
import MovieList from "pages/Movies/MovieList";
import StyledImageContainer from "styled/StyledImageContainer";
import YouTubePlayer from "components/YoutubePlayer";
import MovieLikeButton from "pages/Movies/MovieLikeButton";
import StyledBox from "styled/StyledBox";
import { ModalLink, ModalRouteContext } from "react-router-modal-gallery";
import paths from "constants/paths";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteMovieConfirmDialog from "pages/Movie/DeleteMovieConfirmDialog";
import DeleteIcon from "@material-ui/icons/Delete";
import LoadingIndicator from "components/LoadingIndicator";

const MovieDetails = ({ movie, loading, onEditClick }) => {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { redirectToBack } = useContext(ModalRouteContext);

  const showDeleteConfirm = () => {
    setDeleteConfirmVisible(true);
  };

  const hideDeleteConfirm = () => {
    setDeleteConfirmVisible(false);
  };

  const otherMovies = loading
    ? []
    : movie.director.movies.filter(item => item.id !== movie.id);

  const directorLink = loading ? null : (
    <Link to={`${paths.DIRECTORS}/${movie.director.id}`} component={ModalLink}>
      {movie.director.name}
    </Link>
  );

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <React.Fragment>
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
        <StyledBox styled={{ display: "flex", sm: { display: "block" } }}>
          <StyledImageContainer
            src={movie.imageUrl}
            alt="Movie poster"
            styled={{ height: "268px", width: "182px" }}
          />
          <StyledBox
            styled={{
              padding: "0 16px",
              flex: 1 /* IE11 Fix */
            }}
          >
            <StyledBox
              styled={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <Typography variant="h5">{movie.title}</Typography>
              <MovieLikeButton
                movieId={movie.id}
                viewerHasLiked={movie.viewerHasLiked}
              />
            </StyledBox>

            <Typography variant="subtitle1">{directorLink}</Typography>

            <div>
              <Typography variant="h6">Overview</Typography>
              <Typography>{movie.description}</Typography>
            </div>
          </StyledBox>
        </StyledBox>

        {movie.youtubeId && <YouTubePlayer youtubeId={movie.youtubeId} />}

        <StyledBox styled={{ padding: "16px" }}>
          {otherMovies.length ? (
            <React.Fragment>
              <Typography>
                {otherMovies.length
                  ? `Other movies by `
                  : `There is no other movie by `}
                {directorLink}
              </Typography>
              <MovieList movies={otherMovies} />
            </React.Fragment>
          ) : (
            <Typography>
              {`There is no other movie by `}
              {directorLink}
            </Typography>
          )}
        </StyledBox>
      </DialogContent>

      <DeleteMovieConfirmDialog
        open={deleteConfirmVisible}
        movie={movie}
        onClose={hideDeleteConfirm}
        onCompleted={redirectToBack}
      />
    </React.Fragment>
  );
};

export default MovieDetails;
