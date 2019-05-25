import React from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { RootRef } from "@material-ui/core";

const InfiniteScrollWrapper = ({
  itemCount,
  hasNextPage,
  loading,
  loadMore,
  children
}) => {
  const infiniteContainerRef = useInfiniteScroll({
    itemCount,
    hasNextPage,
    loading,
    loadMore
  });

  return <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>;
};

export default InfiniteScrollWrapper;
