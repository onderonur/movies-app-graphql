import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import clsx from "clsx";
import useMultilineTruncate from "hooks/useMultilineTruncate";

const useStyles = makeStyles(theme => ({
  text: {
    whiteSpace: "pre-wrap",
    maxHeight: ({ maxHeight }) => maxHeight,
    overflow: "hidden"
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

function ReadMore({ maxLineCount, hasFade = true, children }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { ref, maxHeight, hasMore } = useMultilineTruncate({
    maxLineCount,
    truncate: !isExpanded
  });
  const classes = useStyles({
    maxHeight
  });

  function toggleReadMore() {
    const next = !isExpanded;
    setIsExpanded(next);
  }

  const showToggle = hasMore || isExpanded;
  return (
    <>
      <Typography ref={ref} className={clsx(classes.text)}>
        {children}
      </Typography>
      {hasFade && showToggle && !isExpanded ? (
        <div className={classes.fade} />
      ) : null}
      {showToggle ? (
        <Box display="flex" justifyContent="flex-end">
          <Button size="small" color="primary" onClick={toggleReadMore}>
            {`Show ${isExpanded ? "Less" : "More"}`}
          </Button>
        </Box>
      ) : null}
    </>
  );
}

export default ReadMore;
