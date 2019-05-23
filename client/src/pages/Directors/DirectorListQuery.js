// OK
import React from "react";
import { Query } from "react-apollo";
import { GET_DIRECTORS } from "graphql/director/queries";

const DirectorListQuery = ({ children }) => (
  <Query query={GET_DIRECTORS}>
    {({ data, loading, error }) => {
      if (error) {
        return `Error! ${error.message}`;
      }

      const { directors } = data;
      return children({ directors, loading, error });
    }}
  </Query>
);

export default DirectorListQuery;
