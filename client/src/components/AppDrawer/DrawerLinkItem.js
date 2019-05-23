// OK
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const DrawerLinkItem = ({ to, title, icon, onClick }) => (
  <ListItem to={to} button component={RouterLink} onClick={onClick}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItem>
);

export default DrawerLinkItem;
