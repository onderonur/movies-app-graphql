import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  toggleButton: {
    marginRight: theme.spacing(2)
  }
}));

function DrawerToggle({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <>
      <IconButton
        className={classes.toggleButton}
        color="inherit"
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" color="inherit">
        MoviesApp
      </Typography>
    </>
  );
}

export default DrawerToggle;
