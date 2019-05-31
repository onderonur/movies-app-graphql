// OK!!
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import MoviesFeed from "./MoviesFeed";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";
import { Container } from "@material-ui/core";

function Movies() {
  return (
    <Container maxWidth="lg">
      <ViewWithFloatingButton
        fabProps={{
          color: "primary",
          component: AdapterModalLink,
          to: `${paths.MOVIES}/new`,
          icon: <AddIcon />,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <MoviesFeed />
      </ViewWithFloatingButton>
    </Container>
  );
}

export default Movies;
