import React, { useState } from "react";
import useCheckOverflow from "hooks/useCheckOverflow";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import clsx from "clsx";

const LINE_HEIGHT = 1.5;

const useStyles = makeStyles(theme => ({
  text: {
    whiteSpace: "pre-wrap",
    overflow: "hidden",
    fontSize: "1rem",
    lineHeight: LINE_HEIGHT,
    maxHeight: ({ maxLine, isExpanded }) =>
      isExpanded ? "none" : `${maxLine * LINE_HEIGHT}rem`
  },
  fade: {
    background: `linear-gradient(to bottom, ${fade(
      theme.palette.background.paper,
      0
    )} 0%,${fade(theme.palette.background.paper, 0.97)} 95%)`,
    height: 100,
    marginTop: -100,
    position: "relative"
  }
}));

function ReadMore({ className, maxLine, hasFade, children }) {
  const [ref, { overflowedY }] = useCheckOverflow();
  const [isExpanded, setIsExpanded] = useState(false);
  const classes = useStyles({ maxLine, isExpanded });

  function toggleReadMore() {
    const next = !isExpanded;
    setIsExpanded(next);
  }

  return (
    <>
      <Typography ref={ref} className={clsx(classes.text, className)}>
        {children}
      </Typography>
      {hasFade && overflowedY ? <div className={classes.fade} /> : null}
      {overflowedY || isExpanded ? (
        <Box display="flex" justifyContent="flex-end">
          <Button size="small" color="primary" onClick={toggleReadMore}>
            {`Show ${overflowedY ? "More" : "Less"}`}
          </Button>
        </Box>
      ) : null}
    </>
  );
}

export default ReadMore;
