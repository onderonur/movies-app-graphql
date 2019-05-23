// OK
import React from "react";
import { Query } from "react-apollo";
import { GET_MOVIES } from "graphql/movie/queries";

const MovieListQuery = ({ children }) => (
  /**
   * notifyOnNetworkStatusChange: To make "loading" true when "fetchMore" runs.
   * loading is true only on the first request on default behavior.
   * fetchMore doesn't affect "loading" by default.
   */
  <Query query={GET_MOVIES} notifyOnNetworkStatusChange>
    {({ loading, error, data, fetchMore }) => {
      if (error) return `Error! ${error.message}`;

      const movies = data ? data.movies : null;

      return children({ loading, movies, fetchMore });
    }}
  </Query>
);

export default MovieListQuery;
