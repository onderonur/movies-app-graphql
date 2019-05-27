// TODO: Boşa çıkacak, sil bunu
import React from "react";
import { Query } from "react-apollo";
import { GET_MOVIE } from "graphql/movie/queries";

function MovieQuery({ movieId, skip, children }) {
  return (
    <Query query={GET_MOVIE} variables={{ id: movieId }} skip={skip}>
      {({ data, loading, error }) => {
        if (error) {
          return `Error! ${error.message}`;
        }

        const movie = data ? data.movie : null;
        return children({ movie, loading });
      }}
    </Query>
  );
}

export default MovieQuery;
