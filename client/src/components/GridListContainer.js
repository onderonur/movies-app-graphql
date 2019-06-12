import React from "react";
import AddIcon from "@material-ui/icons/Add";
import { roles } from "constants/roles";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";
import { Container, Button, Box } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { BaseGridList } from "./BaseComponents";
import AccessControl from "./AccessControl";
import ScrollToTopButton from "./ScrollToTopButton";

function GridListPage({
  location,
  maxWidth = "lg",
  items,
  loading,
  renderItem
}) {
  return (
    <Container maxWidth={maxWidth}>
      <Box display="flex" justifyContent="flex-end" mb={1}>
        <AccessControl allowedRoles={[roles.ADMIN]}>
          <Button
            color="primary"
            variant="contained"
            to={`${location.pathname}/new`}
            component={AdapterModalLink}
          >
            <AddIcon />
            Add New
          </Button>
        </AccessControl>
      </Box>
      <BaseGridList items={items} loading={loading} renderItem={renderItem} />
      <ScrollToTopButton />
    </Container>
  );
}

export default withRouter(GridListPage);
