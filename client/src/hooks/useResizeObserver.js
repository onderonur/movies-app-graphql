import { useRef, useState, useEffect } from "react";
import ResizeObserver from "resize-observer-polyfill";

function useResizeObserver() {
  const ref = useRef();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();
  const [top, setTop] = useState();
  const [bottom, setBottom] = useState();
  const [left, setLeft] = useState();
  const [right, setRight] = useState();
  const [x, setX] = useState();
  const [y, setY] = useState();

  useEffect(() => {
    const current = ref.current;

    if (current) {
      const resizeObserver = new ResizeObserver(entries => {
        const entry = entries[0];

        const rect = entry.contentRect;

        setHeight(rect.height);
        setWidth(rect.width);
        setTop(rect.top);
        setBottom(rect.bottom);
        setLeft(rect.left);
        setRight(rect.right);
        setX(rect.x);
        setY(rect.y);
      });

      resizeObserver.observe(current);

      return () => resizeObserver.unobserve(current);
    }
  });

  return [ref, { height, width, top, bottom, left, right, x, y }];
}

export default useResizeObserver;
