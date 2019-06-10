import useResizeObserver from "./useResizeObserver";
import { useState, useEffect } from "react";

function useMultilineTruncate({ maxLineCount, truncate }) {
  const [ref, { width, height }] = useResizeObserver();
  const [maxHeight, setMaxHeight] = useState("none");

  function getDOMNodeProperty(node, property) {
    return window.getComputedStyle(node).getPropertyValue(property);
  }

  // TODO: Will add throttle to this. It can crete performance issues
  // when the width and height changes.
  useEffect(() => {
    if (!truncate) {
      setMaxHeight("none");
    } else {
      const node = ref.current;
      if (node) {
        const lineHeight = getDOMNodeProperty(node, "line-height").replace(
          "px",
          ""
        );

        const actualHeight = node.scrollHeight;
        const lineCount = actualHeight / lineHeight;
        setMaxHeight(
          truncate && lineCount > maxLineCount
            ? maxLineCount * lineHeight
            : "none"
        );
      }
    }
  }, [maxLineCount, ref, width, height, truncate]);

  return { ref, maxHeight, hasMore: maxHeight !== "none" };
}

export default useMultilineTruncate;
