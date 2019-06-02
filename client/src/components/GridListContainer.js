// OK!!
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";
import { Container } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { BaseGridList } from "./BaseComponents";

function GridListPage({
  location,
  maxWidth = "lg",
  items,
  loading,
  renderItem
}) {
  return (
    <Container maxWidth={maxWidth}>
      <ViewWithFloatingButton
        fabProps={{
          color: "primary",
          component: AdapterModalLink,
          to: `${location.pathname}/new`,
          icon: <AddIcon />,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <BaseGridList items={items} loading={loading} renderItem={renderItem} />
      </ViewWithFloatingButton>
    </Container>
  );
}

export default withRouter(GridListPage);
