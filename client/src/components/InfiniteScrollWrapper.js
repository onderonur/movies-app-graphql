// OK!!
import React from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { RootRef } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";

function InfiniteScrollWrapper({ hasNextPage, loading, loadMore, children }) {
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    loadMore
  });

  return (
    <>
      <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>
      {loading && <LoadingIndicator />}
    </>
  );
}

export default InfiniteScrollWrapper;
