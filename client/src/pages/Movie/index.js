// Reusability
import React from "react";
import paths from "constants/paths";
import EditableDetailsDialog from "components/EditableDetailsDialog";
import { GET_MOVIE } from "graphql/movie/queries";
import MovieForm from "./MovieForm";
import MovieDetails from "./MovieDetails";
import { useModalGallery } from "react-router-modal-gallery";

function Movie({
  match: {
    params: { movieId }
  },
  history
}) {
  const isNewMovie = movieId === "new";
  const { redirectToBack } = useModalGallery();

  return (
    <EditableDetailsDialog
      id={movieId}
      queryProps={{
        query: GET_MOVIE,
        variables: { id: movieId }
      }}
      renderForm={({ data, loading, finishEditing }) => {
        const movie = data ? data.movie : null;

        return (
          <MovieForm
            movie={movie}
            loading={loading}
            onSubmitCompleted={({ savedMovie }) => {
              // TODO: Bu kısmı da editor'e al
              if (isNewMovie) {
                history.replace({
                  pathname: `${paths.MOVIES}/${savedMovie.id}`,
                  state: { modal: true }
                });
              }

              finishEditing();
            }}
            // TODO: Editore al bunu da
            onCancel={isNewMovie ? redirectToBack : finishEditing}
          />
        );
      }}
      renderDetails={({ data, loading, startEditing }) => {
        const movie = data ? data.movie : null;

        return (
          <MovieDetails
            movie={movie}
            loading={loading}
            onEditClick={startEditing}
          />
        );
      }}
    />
  );
}

export default Movie;
