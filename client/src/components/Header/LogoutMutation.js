// OK
import React from "react";
import { Mutation } from "react-apollo";
import { CLEAR_USER_INFO } from "graphql/cache/mutations";

function LogoutMutation({ onCompleted, children }) {
  return (
    <Mutation mutation={CLEAR_USER_INFO} onCompleted={onCompleted}>
      {mutation => children(mutation)}
    </Mutation>
  );
}

export default LogoutMutation;
