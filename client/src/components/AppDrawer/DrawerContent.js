// OK
import React from "react";
import { List, Divider } from "@material-ui/core";
import DrawerLinkItem from "./DrawerLinkItem";
import paths from "constants/paths";
import MovieIcon from "@material-ui/icons/Movie";
import PersonIcon from "@material-ui/icons/Person";

function DrawerContent({ drawerOpen }) {
  return (
    <>
      <List>
        <DrawerLinkItem
          to={paths.MOVIES}
          text="Movies"
          icon={<MovieIcon />}
          aria-label="Movies"
          drawerOpen={drawerOpen}
        />
        <DrawerLinkItem
          to={paths.DIRECTORS}
          text="Directors"
          icon={<PersonIcon />}
          drawerOpen={drawerOpen}
        />
      </List>
      <Divider />
    </>
  );
}

export default DrawerContent;
