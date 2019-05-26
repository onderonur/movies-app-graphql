// OK
import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { BaseLink } from "components/BaseComponents";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  item: {
    color: theme.palette.text.primary
  }
}));

function DrawerLinkItem({ to, title, icon, onClick }) {
  const classes = useStyles();

  return (
    <ListItem
      className={classes.item}
      to={to}
      button
      component={BaseLink}
      onClick={onClick}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={title} />
    </ListItem>
  );
}

export default DrawerLinkItem;
