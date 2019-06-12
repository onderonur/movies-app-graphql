import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { Button, Box, Typography } from "@material-ui/core";
import useResizeObserver from "hooks/useResizeObserver";

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

function ReadMore({
  maxLineCount,
  hasFade = true,
  hasToggle = false,
  children
}) {
  const [ref, { width, height }] = useResizeObserver();
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("none");
  const classes = useStyles({ maxHeight });

  function toggleReadMore() {
    const next = !isExpanded;
    setIsExpanded(next);
  }

  // TODO: Will add throttle to this. It can crete performance issues
  // when the width and height changes.
  useEffect(() => {
    function getDOMNodeProperty(node, property) {
      return window.getComputedStyle(node).getPropertyValue(property);
    }

    if (isExpanded) {
      setMaxHeight("none");
    } else {
      const node = ref.current;
      if (node) {
        const lineHeight = getDOMNodeProperty(node, "line-height").replace(
          "px",
          ""
        );

        const actualHeight = node.scrollHeight;
        const totalLineCount = actualHeight / lineHeight;
        setMaxHeight(
          maxLineCount && totalLineCount > maxLineCount
            ? maxLineCount * lineHeight
            : "none"
        );
      }
    }
  }, [maxLineCount, ref, width, height, isExpanded]);

  const hasMore = maxHeight !== "none";
  const showToggle = hasToggle && (hasMore || isExpanded);
  return (
    <>
      <Typography ref={ref} className={classes.text}>
        {children}
      </Typography>
      {hasFade && !isExpanded && hasMore ? <div className={classes.fade} /> : null}
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
