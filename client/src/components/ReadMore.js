import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { fade } from "@material-ui/core/styles";
import { Typography, Button, Box } from "@material-ui/core";
import clsx from "clsx";
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

function ReadMore({ maxLineCount, hasFade = true, children }) {
  const [ref, { width, height }] = useResizeObserver();
  const [showToggle, setShowToggle] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [maxHeight, setMaxHeight] = useState("none");
  const classes = useStyles({
    maxHeight
  });

  function toggleReadMore() {
    const next = !isExpanded;
    setIsExpanded(next);
  }

  function getDOMNodeProperty(node, property) {
    return window.getComputedStyle(node).getPropertyValue(property);
  }

  useEffect(() => {
    const node = ref.current;
    if (node) {
      const lineHeight = getDOMNodeProperty(node, "line-height").replace(
        "px",
        ""
      );
      setMaxHeight(isExpanded ? "none" : maxLineCount * lineHeight);

      const actualHeight = node.scrollHeight;
      const lineCount = actualHeight / lineHeight;
      setShowToggle(lineCount > maxLineCount);
    }
  }, [maxLineCount, ref, isExpanded, width, height]);

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
