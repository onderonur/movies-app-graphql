// OK!!
import React, { useContext } from "react";
import { NotificationContext } from "App";
import ConfirmDialog from "components/ConfirmDialog";
import { DELETE_DIRECTOR } from "graphql/director/mutations";
import { GET_DIRECTORS } from "graphql/director/queries";
import { GET_MOVIES } from "graphql/movie/queries";

/**
 * When a director is deleted, it cascades and all of related movies are delete from DB.
 * Thus, we need to clean this movies from the cache too.
 */
const cleanMoviesOfDirectorFromCache = directorId => cache => {
  /**
   * The readQuery method is very similar to the query method on ApolloClient except that
   * readQuery will never make a request to your GraphQL server. The query method, on the other hand,
   * may send a request to your server if the appropriate data is not in your cache whereas
   * readQuery will throw an error if the data is not in your cache. readQuery will always
   * read from the cache.
   */
  try {
    const query = GET_MOVIES;
    /**
     * The root query that gets movies has is movies({first: 10}) by default.
     * All of the "fetchMore" on the MovieFeed adds request result to this query.
     * Thus, when we use GET_MOVIES, which has the "first: 10" variable in it by default,
     * we can get all of the movies in the cache.
     */
    const cacheData = cache.readQuery({ query });
    const restEdges = cacheData.movies.edges.filter(
      edge => edge.node.director.id !== directorId
    );

    const cleanedData = {
      ...cacheData,
      movies: {
        ...cacheData.movies,
        edges: restEdges
      }
    };

    cache.writeQuery({ query, data: cleanedData });
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
        update: cleanMoviesOfDirectorFromCache(director.id),
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
