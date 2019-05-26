// Boşa çıkacak, sil bunu
import React from "react";
import { Query } from "react-apollo";
import { GET_DIRECTOR } from "graphql/director/queries";

function DirectorQuery({ id, withMovies, skip, children }) {
  return (
    <Query query={GET_DIRECTOR} variables={{ id, withMovies }} skip={skip}>
      {({ data, loading, error }) => {
        if (error) {
          return `Error! ${error.message}`;
        }

        const director = data ? data.director : null;

        return children({ director, loading });
      }}
    </Query>
  );
}

export default DirectorQuery;
