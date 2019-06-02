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

function DrawerContent({ isDrawerOpen }) {
  const classes = useStyles();

  return (
    <MenuList className={classes.menuList}>
      <DrawerLinkItem
        to={paths.MOVIES}
        text="Movies"
        icon={<MovieIcon />}
        isDrawerOpen={isDrawerOpen}
      />
      <DrawerLinkItem
        to={paths.DIRECTORS}
        text="Directors"
        icon={<PersonIcon />}
        isDrawerOpen={isDrawerOpen}
      />
    </MenuList>
  );
}

export default DrawerContent;
