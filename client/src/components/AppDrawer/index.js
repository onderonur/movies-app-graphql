// OK
import React, { useState, useEffect, useRef } from "react";
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
import clsx from "clsx";

const DRAWER_WIDTH = 240;

const widthTransition = theme =>
  theme.transitions.create("all", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  });

const useStyles = makeStyles(theme => ({
  nav: {
    transition: widthTransition(theme),
    [theme.breakpoints.up("md")]: {
      width: ({ open }) => (open ? DRAWER_WIDTH : 0)
    }
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    backgroundColor: theme.palette.background.paper
  },
  drawerOpen: {
    width: DRAWER_WIDTH,
    transition: widthTransition(theme)
  },
  drawerClose: {
    width: theme.spacing(7) + 1,
    overflowX: "hidden",
    transition: widthTransition(theme)
  }
}));

function AppDrawer({ children, location }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  const isMobile = useDetectMobile();
  const prevLocation = useRef(location);

  function toggleDrawer() {
    setOpen(!open);
  }

  // TODO: Bug vardı, bi bak OK mi
  useEffect(() => {
    if (isMobile && location !== prevLocation.current) {
      setOpen(false);
    }
    prevLocation.current = location;
  }, [location, isMobile]);

  return (
    <nav className={classes.nav}>
      <SwipeableDrawer
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: !isMobile && open,
            [classes.drawerClose]: !isMobile && !open
          })
        }}
        variant={isMobile ? "temporary" : "permanent"}
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
        <DrawerContent drawerOpen={open} />
      </SwipeableDrawer>
      {children({ toggleDrawer })}
    </nav>
  );
}

export default withRouter(AppDrawer);
