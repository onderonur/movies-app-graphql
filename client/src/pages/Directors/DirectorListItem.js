// OK
import React from "react";
import { ListItem, ListItemText, Typography } from "@material-ui/core";
import paths from "constants/paths";
import { ModalLink } from "react-router-modal-gallery";

const DirectorListItem = ({ director }) => (
  <ListItem
    button
    to={`${paths.DIRECTORS}/${director.id}`}
    component={ModalLink}
    divider
  >
    <ListItemText
      primary={<Typography color="primary">{director.name}</Typography>}
    />
  </ListItem>
);

export default DirectorListItem;
