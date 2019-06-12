// OK!!
import React, { useContext } from "react";
import { NotificationContext } from "App";
import ConfirmDialog from "components/ConfirmDialog";
import { DELETE_DIRECTOR } from "graphql/director/mutations";
import { GET_DIRECTORS } from "graphql/director/queries";
import { MOVIE_FRAGMENT } from "graphql/movie/fragments";
import { getCacheKey } from "graphql/cache/resolvers";

// TODO: Buradaki açıklamaları düzelt
// When a director is deleted, it cascades and all of related movies are delete from DB.
// Thus, we need to clean this movies from the cache too.
const cleanMoviesOfDirectorFromCache = director => cache => {
  // The readQuery method is very similar to the query method on ApolloClient except that
  // readQuery will never make a request to your GraphQL server. The query method, on the other hand,
  // may send a request to your server if the appropriate data is not in your cache whereas
  // readQuery will throw an error if the data is not in your cache. readQuery will always
  // read from the cache.
  try {
    const directorMovies = director.movies;

    directorMovies.forEach(movie => {
      const cacheKey = getCacheKey("Movie", movie.id);

      const cachedData = cache.readFragment({
        id: cacheKey,
        fragment: MOVIE_FRAGMENT
      });

      const movieWithDeletedFlag = {
        ...cachedData,
        __deleted: true
      };

      cache.writeFragment({
        id: cacheKey,
        fragment: MOVIE_FRAGMENT,
        data: movieWithDeletedFlag
      });
    });
  } catch (err) {
    console.log(err);
  }
};

function DeleteDirectorConfirmDialog({ open, director, onClose, onCompleted }) {
  const { pushNotification } = useContext(NotificationContext);

  return (
    <ConfirmDialog
      open={open}
      title="Delete Director?"
      content={`Are you sure to delete ${
        director.name
      } and all of their movies?`}
      onClose={onClose}
      confirmText="Delete"
      mutationProps={{
        mutation: DELETE_DIRECTOR,
        variables: {
          directorId: director.id
        },
        refetchQueries: [{ query: GET_DIRECTORS }],
        update: cleanMoviesOfDirectorFromCache(director),
        onCompleted: ({ deleteDirector }) => {
          const { success, message } = deleteDirector;
          if (success) {
            if (onCompleted) {
              onCompleted();
            }

            onClose();
          }
          if (message) {
            pushNotification({ variables: { message } });
          }
        }
      }}
    />
  );
}

export default DeleteDirectorConfirmDialog;
