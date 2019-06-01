import { useState, useEffect } from "react";
import useResizeObserver from "./useResizeObserver";

function useCheckOverflow() {
  const [ref, { width, height }] = useResizeObserver();
  const [overflowedX, setOverflowedX] = useState();
  const [overflowedY, setOverflowedY] = useState();

  useEffect(() => {
    const current = ref.current;

    if (current) {
      setOverflowedX(current.scrollWidth > width);
      setOverflowedY(current.scrollHeight > height);
    }
  }, [ref, height, width]);

  return [ref, { overflowedX, overflowedY }];
}

export default useCheckOverflow;
