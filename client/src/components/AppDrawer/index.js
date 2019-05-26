// OK
import React, { useState, useEffect } from "react";
import {
  Divider,
  Toolbar,
  SwipeableDrawer,
  makeStyles
} from "@material-ui/core";
import DrawerContent from "./DrawerContent";
import { withRouter } from "react-router-dom";
import useDetectMobile from "hooks/useDetectMobile";
import DrawerToggler from "./DrawerToggler";

const DRAWER_WIDTH = 240;

const useStyles = makeStyles(theme => ({
  nav: {
    transition: theme.transitions.create("all", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.up("md")]: {
      width: ({ open }) => (open ? DRAWER_WIDTH : 0)
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgrounColor: theme.palette.background.paper
  }
}));

function AppDrawer({ children, location }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  const isMobile = useDetectMobile();

  function toggleDrawer() {
    setOpen(!open);
  }

  useEffect(() => {
    if (isMobile) {
      setOpen(false);
    }
  }, [location.pathname, isMobile]);

  return (
    <nav className={classes.nav}>
      <SwipeableDrawer
        classes={{
          paper: classes.drawerPaper
        }}
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={open}
        onOpen={toggleDrawer}
        onClose={toggleDrawer}
        disableSwipeToOpen={!isMobile}
      >
        <Toolbar>
          <DrawerToggler toggleDrawer={toggleDrawer} />
        </Toolbar>
        <Divider />
        <DrawerContent />
      </SwipeableDrawer>
      {children({ toggleDrawer })}
    </nav>
  );
}

export default withRouter(AppDrawer);
