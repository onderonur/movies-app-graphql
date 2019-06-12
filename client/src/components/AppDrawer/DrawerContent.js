import React from "react";
import {
  MenuList,
  makeStyles,
  MenuItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";
import DrawerLinkItem from "./DrawerLinkItem";
import paths from "constants/paths";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";
import ThemeToggle from "components/ThemeToggle";
import WbSunny from "@material-ui/icons/WbSunny";

const useStyles = makeStyles(theme => ({
  menuList: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  noShrink: {
    flexShrink: 0
  }
}));

function DrawerContent({ isDrawerOpen }) {
  const classes = useStyles();

  return (
    <>
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
      {isDrawerOpen ? (
        <MenuList className={classes.menuList}>
          <MenuItem disableRipple>
            <ListItemIcon>
              <WbSunny />
            </ListItemIcon>
            <ListItemText className={classes.noShrink} primary="Dark Theme" />
            <ThemeToggle />
          </MenuItem>
        </MenuList>
      ) : null}
    </>
  );
}

export default DrawerContent;
