// OK
import React from "react";
import { List, Divider } from "@material-ui/core";
import DrawerLinkItem from "./DrawerLinkItem";
import paths from "constants/paths";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";

function DrawerContent({ isMobile, toggleDrawer }) {
  const onItemClick = isMobile ? toggleDrawer : undefined;

  return (
    <>
      <List>
        <DrawerLinkItem
          to={paths.MOVIES}
          title="Movies"
          icon={<MovieIcon />}
          onClick={onItemClick}
        />
        <DrawerLinkItem
          to={paths.DIRECTORS}
          title="Directors"
          icon={<PersonIcon />}
          onClick={onItemClick}
        />
      </List>
      <Divider />
    </>
  );
}

export default DrawerContent;
