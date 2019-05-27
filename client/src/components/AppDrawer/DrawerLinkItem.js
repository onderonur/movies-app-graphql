// OK
import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useDetectMobile from "hooks/useDetectMobile";

function DrawerLinkItem({ to, text, icon, drawerOpen }) {
  const isMobile = useDetectMobile();

  return (
    <Tooltip title={!isMobile && !drawerOpen ? text : ""} placement="right">
      <ListItem button component={Link} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Tooltip>
  );
}

export default DrawerLinkItem;
