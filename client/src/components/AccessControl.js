// OK!!
import React from "react";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "graphql/cache/queries";

function AccessControl({ allowedRoles, children }) {
  return (
    <Query query={GET_USER_INFO}>
      {({ data: { userInfo } }) => {
        const isLoggedIn = !!userInfo;

        if (!isLoggedIn) {
          return null;
        }

        const { role } = userInfo;

        if (!role || !allowedRoles.includes(role)) {
          return null;
        }

        return children;
      }}
    </Query>
  );
}

export default AccessControl;
