import React from "react";
import StyledBox from "styled/StyledBox";
import FloatingButton from "./FloatingButton";
import AccessControl from "./AccessControl";

const ViewWithFloatingButton = ({ children, buttonProps }) => {
  const { icon, allowedRolesToClick, ...rest } = buttonProps;
  const button = (
    <FloatingButton
      {...rest}
      styled={{
        position: "fixed",
        bottom: "20px",
        zIndex: 100
      }}
    >
      {icon}
    </FloatingButton>
  );

  return (
    <React.Fragment>
      <StyledBox styled={{ paddingBottom: "60px" }}>{children}</StyledBox>
      {allowedRolesToClick ? (
        <AccessControl allowedRoles={allowedRolesToClick}>
          {button}
        </AccessControl>
      ) : (
        button
      )}
    </React.Fragment>
  );
};

export default ViewWithFloatingButton;
