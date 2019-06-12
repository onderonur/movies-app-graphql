// OK
import React, { useContext } from "react";
import { NotificationContext } from "App";
import ConfirmDialog from "components/ConfirmDialog";
import { DELETE_MOVIE } from "graphql/movie/mutations";
import { MOVIE_FRAGMENT } from "graphql/movie/fragments";
import { getCacheKey } from "graphql/cache/resolvers";

const deleteMovieUpdate = () => (cache, { data: { deleteMovie } }) => {
  const { success, movie: deletedMovie } = deleteMovie;

  const cacheKey = getCacheKey("Movie", deletedMovie.id);

  if (success) {
    const movie = cache.readFragment({
      id: cacheKey,
      fragment: MOVIE_FRAGMENT
    });

    let movieWithDeletedFlag = {
      ...movie,
      __deleted: true
    };

    // Write our data back to the cache.
    cache.writeFragment({
      id: cacheKey,
      fragment: MOVIE_FRAGMENT,
      data: movieWithDeletedFlag
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
