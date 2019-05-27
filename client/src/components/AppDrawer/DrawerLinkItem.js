// OK
import React from "react";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip
} from "@material-ui/core";
import { BaseLink } from "components/BaseComponents";
import { makeStyles } from "@material-ui/styles";
import useDetectMobile from "hooks/useDetectMobile";

const useStyles = makeStyles(theme => ({
  item: {
    color: theme.palette.text.primary
  }
}));

function DrawerLinkItem({ to, text, icon, drawerOpen }) {
  const classes = useStyles();
  const isMobile = useDetectMobile();

  return (
    <Tooltip title={!isMobile && !drawerOpen ? text : ""} placement="right">
      <ListItem className={classes.item} to={to} button component={BaseLink}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </Tooltip>
  );
}

export default DrawerLinkItem;
