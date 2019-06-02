// OK!!
import React from "react";
import {
  ListItemIcon,
  ListItemText,
  Tooltip,
  MenuItem
} from "@material-ui/core";
import useDetectMobile from "hooks/useDetectMobile";
import { RouterLink } from "components/BaseComponents/BaseLink";
import { withRouter } from "react-router-dom";

function DrawerLinkItem({ to, text, icon, isDrawerOpen, location }) {
  const isMobile = useDetectMobile();

  const isActive = location.pathname === to;

  return (
    <Tooltip title={!isMobile && !isDrawerOpen ? text : ""} placement="right">
      <MenuItem button component={RouterLink} to={to} selected={isActive}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </MenuItem>
    </Tooltip>
  );
}

export default withRouter(DrawerLinkItem);
