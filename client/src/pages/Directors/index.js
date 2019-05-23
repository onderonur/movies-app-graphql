// OK
import React from "react";
import DirectorList from "./DirectorList";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import StyledBox from "styled/StyledBox";
import { ModalLink } from "react-router-modal-gallery";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";

const Directors = () => (
  <StyledBox styled={{ maxWidth: "600px", margin: "auto", padding: 0 }}>
    <ViewWithFloatingButton
      buttonProps={{
        color: "primary",
        size: "medium",
        component: ModalLink,
        to: `${paths.DIRECTORS}/new`,
        icon: <AddIcon />,
        allowedRolesToClick: [roles.ADMIN]
      }}
    >
      <DirectorList />
    </ViewWithFloatingButton>
  </StyledBox>
);

export default Directors;
