import React from "react";
import { Query } from "react-apollo";
import { GET_USER_INFO } from "graphql/cache/queries";

function UserInfoQuery({ children }) {
  return (
    <Query query={GET_USER_INFO}>
      {({ data }) => {
        const { userInfo } = data;
        return children({ isLoggedIn: !!userInfo, userInfo });
      }}
    </Query>
  );
}

export default UserInfoQuery;
