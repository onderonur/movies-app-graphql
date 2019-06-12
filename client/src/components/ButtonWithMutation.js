import React from "react";
import { Mutation } from "react-apollo";
import { BaseButton } from "./BaseComponents";

function ButtonWithMutation({ color, onClick, children, ...rest }) {
  return (
    <Mutation {...rest}>
      {(mutation, { loading }) => (
        <BaseButton loading={loading} color={color} onClick={mutation}>
          {children}
        </BaseButton>
      )}
    </Mutation>
  );
}

export default ButtonWithMutation;
