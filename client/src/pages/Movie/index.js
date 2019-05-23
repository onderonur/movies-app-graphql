// Reusability
import React, { useContext } from "react";
import paths from "constants/paths";
import { ModalRouteContext } from "react-router-modal-gallery";
import EditableDetailsDialog from "components/EditableDetailsDialog";
import { GET_MOVIE } from "graphql/movie/queries";
import MovieForm from "./MovieForm";
import MovieDetails from "./MovieDetails";
import { BaseDialog } from "components/BaseComponents";

const Movie = ({
  match: {
    params: { movieId }
  },
  history
}) => {
  const isNewMovie = movieId === "new";
  const { redirectToBack } = useContext(ModalRouteContext);

  return (
    <BaseDialog open onExited={redirectToBack}>
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
                // Bu kısmı da editor'e al
                if (isNewMovie) {
                  history.replace({
                    pathname: `${paths.MOVIES}/${savedMovie.id}`,
                    state: { modal: true }
                  });
                }

                finishEditing();
              }}
              // Editore al bunu da
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
    </BaseDialog>
  );
};

export default Movie;
