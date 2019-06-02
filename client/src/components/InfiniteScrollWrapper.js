// OK!!
import React from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { RootRef } from "@material-ui/core";

function InfiniteScrollWrapper({ hasNextPage, loading, loadMore, children }) {
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    loadMore
  });

  return (
    <>
      <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>
    </>
  );
}

export default InfiniteScrollWrapper;
