// OK!!
import React from "react";
import { MenuList, makeStyles } from "@material-ui/core";
import DrawerLinkItem from "./DrawerLinkItem";
import paths from "constants/paths";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(theme => ({
  menuList: {
    borderBottom: `1px solid ${theme.palette.divider}`
  }
}));

function DrawerContent({ drawerOpen }) {
  const classes = useStyles();

  return (
    <MenuList className={classes.menuList}>
      <DrawerLinkItem
        to={paths.MOVIES}
        text="Movies"
        icon={<MovieIcon />}
        drawerOpen={drawerOpen}
      />
      <DrawerLinkItem
        to={paths.DIRECTORS}
        text="Directors"
        icon={<PersonIcon />}
        drawerOpen={drawerOpen}
      />
    </MenuList>
  );
}

export default DrawerContent;
