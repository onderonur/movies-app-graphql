// OK!!
import React from "react";
import { Query } from "react-apollo";
import { GET_MOVIES } from "graphql/movie/queries";

function MovieListQuery({ variables, children }) {
  return (
    // notifyOnNetworkStatusChange: To make "loading" true when "fetchMore" runs.
    // loading is true only on the first request on default behavior.
    // fetchMore doesn't affect "loading" by default.
    <Query query={GET_MOVIES} variables={variables} notifyOnNetworkStatusChange>
      {({ loading, error, data, fetchMore }) => {
        if (error) return `Error! ${error.message}`;

        const movies =
          data && data.movies
            ? {
                ...data.movies,
                edges: data.movies.edges.filter(edge => !edge.node.__deleted)
              }
            : null;

        return children({ loading, movies, fetchMore });
      }}
    </Query>
  );
}

export default MovieListQuery;
