import { useEffect, useRef, useCallback, useState } from "react";
import useWindowHeight from "./useWindowHeight";

const useInfiniteScroll = ({
  itemCount,
  hasNextPage,
  loading,
  loadMore,
  threshold = 150
}) => {
  const ref = useRef();
  const windowHeight = useWindowHeight();
  const [listen, setListen] = useState(true);
  const prevItemCount = useRef(itemCount);

  const handleLoadMore = useCallback(() => {
    if (listen) {
      // Get if the distance between bottom of the container and bottom of the window
      // is less than "threshold"
      const checkOffsetBottom = () => {
        const offsetBottom = ref.current
          ? ref.current.getBoundingClientRect().bottom - windowHeight
          : null;

        const lessThanThreshold =
          offsetBottom !== null
            ? offsetBottom !== null
              ? offsetBottom < threshold
              : false
            : false;

        return lessThanThreshold;
      };

      const validOffset = checkOffsetBottom();

      if (validOffset && !loading && hasNextPage) {
        // To prevent a scroll or resize event to repeatedly call this event
        setListen(false);
        loadMore();
      }
    }
  }, [loading, listen, hasNextPage, loadMore, threshold, windowHeight]);

  useEffect(() => {
    if (!loading) {
      // Loading is finished, start listening again
      setListen(true);

      if (prevItemCount.current !== itemCount) {
        prevItemCount.current = itemCount;
        handleLoadMore();
      }
    }
  }, [loading, itemCount, handleLoadMore]);

  useEffect(() => {
    if (listen) {
      window.addEventListener("scroll", handleLoadMore);
      window.addEventListener("resize", handleLoadMore);

      return () => {
        window.removeEventListener("scroll", handleLoadMore);
        window.removeEventListener("resize", handleLoadMore);
      };
    }
  }, [listen, handleLoadMore]);

  return ref;
};

export default useInfiniteScroll;
