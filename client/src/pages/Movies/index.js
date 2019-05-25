// OK
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import StyledBox from "styled/StyledBox";
import { ModalLink } from "react-router-modal-gallery";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import MoviesFeed from "./MoviesFeed";

const Movies = () => (
  <StyledBox styled={{ maxWidth: "600px", margin: "auto", padding: 0 }}>
    <ViewWithFloatingButton
      buttonProps={{
        color: "primary",
        size: "large",
        component: ModalLink,
        to: `${paths.MOVIES}/new`,
        icon: <AddIcon />,
        allowedRolesToClick: [roles.ADMIN]
      }}
    >
      <MoviesFeed />
    </ViewWithFloatingButton>
  </StyledBox>
);

export default Movies;
