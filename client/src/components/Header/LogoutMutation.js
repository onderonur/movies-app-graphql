// OK
import React from "react";
import { Mutation } from "react-apollo";
import { CLEAR_USER_INFO } from "graphql/cache/mutations";

const LogoutMutation = ({ onCompleted, children }) => (
  <Mutation mutation={CLEAR_USER_INFO} onCompleted={onCompleted}>
    {mutation => children(mutation)}
  </Mutation>
);

export default LogoutMutation;
