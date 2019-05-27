// OK
import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import useDetectMobile from "hooks/useDetectMobile";
import { AdapterLink } from "components/BaseComponents/BaseLink";

function DrawerLinkItem({ to, text, icon, drawerOpen }) {
  const isMobile = useDetectMobile();

  return (
    <Tooltip title={!isMobile && !drawerOpen ? text : ""} placement="right">
      <ListItem button component={AdapterLink} to={to}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Tooltip>
  );
}

export default DrawerLinkItem;
