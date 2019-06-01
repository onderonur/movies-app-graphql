import React, { useState } from "react";
import useCheckOverflow from "hooks/useCheckOverflow";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { Link } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    overflow: "hidden",
    maxHeight: ({ maxHeight }) => maxHeight
  },
  fade: {
    background: `linear-gradient(to bottom, ${fade(
      theme.palette.background.paper,
      0
    )} 0%,${fade(theme.palette.background.paper, 0.97)} 95%)`,
    height: 100,
    marginTop: -100,
    position: "relative"
  },
  toggle: {
    textAlign: "right"
  }
}));

function ShowMore({ maxHeight, children }) {
  const [ref, { overflowedY }] = useCheckOverflow();
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles({ maxHeight: showMore ? "none" : maxHeight });

  function toggleShowMore() {
    const next = !showMore;
    setShowMore(next);
  }

  return (
    <>
      <div className={classes.container} ref={ref}>
        {children}
      </div>
      {overflowedY && !showMore ? <div className={classes.fade} /> : null}
      {overflowedY || showMore ? (
        <div className={classes.toggle}>
          <Link component="button" type="button" onClick={toggleShowMore}>
            {`Show ${showMore ? "Less" : "More"}...`}
          </Link>
        </div>
      ) : null}
    </>
  );
}

export default ShowMore;
