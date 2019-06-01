import { useRef, useState, useEffect } from "react";
import useInterval from "./useInterval";

function useCheckOverflow() {
  const ref = useRef();
  const [overflowedX, setOverflowedX] = useState();
  const [overflowedY, setOverflowedY] = useState();

  function checkOverflow() {
    const current = ref.current;
    if (current) {
      const rect = current.getBoundingClientRect();
      const { height, width } = rect;

      setOverflowedX(current.scrollWidth > width);
      setOverflowedY(current.scrollHeight > height);
    }
  }

  useEffect(() => {
    checkOverflow();
  }, []);

  useInterval(checkOverflow, 200);

  return [ref, { overflowedX, overflowedY }];
}

export default useCheckOverflow;
