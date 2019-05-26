// OK
import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import paths from "constants/paths";
import { BaseLink } from "components/BaseComponents";

function DirectorListItem({ director }) {
  return (
    <ListItem
      button
      to={`${paths.DIRECTORS}/${director.id}`}
      toModal
      component={BaseLink}
      divider
    >
      <ListItemText
        primary={<Typography color="primary">{director.name}</Typography>}
      />
    </ListItem>
  );
}

export default DirectorListItem;
