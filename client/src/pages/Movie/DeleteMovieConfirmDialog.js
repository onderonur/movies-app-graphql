// OK
import React, { useContext } from "react";
import { NotificationContext } from "App";
import ConfirmDialog from "components/ConfirmDialog";
import { DELETE_MOVIE } from "graphql/movie/mutations";
import { GET_MOVIES } from "graphql/movie/queries";

const deleteMovieUpdate = () => (cache, { data: { deleteMovie } }) => {
  const { success, movie: deletedMovie } = deleteMovie;

  if (success) {
    const query = {
      query: GET_MOVIES,
      variables: {
        first: 10
      }
    };

    // Read the data from our cache for this query.
    const cacheData = cache.readQuery(query);
    const { movies } = cacheData;

    const deletedMovieId = deletedMovie.id;
    // Remove the deleted movie from the cache
    const remainingEdges = movies.edges.filter(
      edge => edge.node.id !== deletedMovieId
    );

    const newData = {
      movies: {
        ...movies,
        edges: remainingEdges
      }
    };

    // Write our data back to the cache.
    cache.writeQuery({
      ...query,
      data: newData
    });
  }
};

function DeleteMovieConfirmDialog({ open, movie, onClose, onCompleted }) {
  const { pushNotification } = useContext(NotificationContext);

  return (
    movie && (
      <ConfirmDialog
        open={open}
        title="Delete Movie?"
        content={`Are you sure to delete ${movie.title}?`}
        onClose={onClose}
        confirmText="Delete"
        mutationProps={{
          mutation: DELETE_MOVIE,
          variables: {
            movieId: movie.id
          },
          onCompleted: data => {
            const {
              deleteMovie: { success, message }
            } = data;
            if (success) {
              if (onCompleted) {
                onCompleted();
              }

              onClose();
            }
            if (message) {
              pushNotification({ variables: { message } });
            }
          },
          update: deleteMovieUpdate()
        }}
      />
    )
  );
}

export default DeleteMovieConfirmDialog;
