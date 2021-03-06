import React, { useEffect, useState } from "react";
import { Fab, Grow } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import throttle from "lodash/throttle";

const THRESHOLD = 300;
const THROTTLE_WAIT = 200;

const useStyles = makeStyles(theme => ({
  fab: {
    position: "fixed",
    bottom: 20,
    right: 20,
    zIndex: theme.zIndex.appBar
  }
}));

function ScrollToTopButton() {
  const classes = useStyles();

  function checkScrollThreshold() {
    return window.pageYOffset > THRESHOLD;
  }

  const [show, setShow] = useState(checkScrollThreshold());

  function handleOnClick() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    function handleScroll() {
      setShow(checkScrollThreshold());
    }

    const throttledHandleScroll = throttle(handleScroll, THROTTLE_WAIT);

    window.addEventListener("scroll", throttledHandleScroll);

    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  return (
    <Grow in={show}>
      <Fab className={classes.fab} color="secondary" onClick={handleOnClick}>
        <KeyboardArrowUpIcon />
      </Fab>
    </Grow>
  );
}

export default ScrollToTopButton;
