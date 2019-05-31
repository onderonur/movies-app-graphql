// OK!!
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";
import DirectorGridList from "./DirectorGridList";
import { Container } from "@material-ui/core";

function Directors() {
  return (
    <Container maxWidth="lg">
      <ViewWithFloatingButton
        fabProps={{
          color: "primary",
          component: AdapterModalLink,
          to: `${paths.DIRECTORS}/new`,
          icon: <AddIcon />,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <DirectorGridList />
      </ViewWithFloatingButton>
    </Container>
  );
}

export default Directors;
