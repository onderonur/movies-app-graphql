import React from "react";
import UserInfoQuery from "components/QueryComponents/UserInfoQuery";

function AccessControl({ allowedRoles, children }) {
  return (
    <UserInfoQuery>
      {({ isLoggedIn, userInfo }) => {
        if (!isLoggedIn) {
          return null;
        }

        const { role } = userInfo;

        if (!role || !allowedRoles.includes(role)) {
          return null;
        }

        return children;
      }}
    </UserInfoQuery>
  );
}

export default AccessControl;
