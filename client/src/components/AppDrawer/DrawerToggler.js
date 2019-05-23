// OK
import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const DrawerToggler = ({ toggleDrawer }) => (
  <React.Fragment>
    <IconButton
      color="inherit"
      style={{
        marginRight: 12
      }}
      onClick={toggleDrawer}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" color="inherit">
      MoviesApp
    </Typography>
  </React.Fragment>
);

export default DrawerToggler;
