import React from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { RootRef } from "@material-ui/core";
import StyledBox from "styled/StyledBox";
import LoadingIndicator from "./LoadingIndicator";

const InfiniteScrollWrapper = ({
  hasNextPage,
  loading,
  loadMore,
  children
}) => {
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    loadMore
  });

  return (
    <>
      <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>
      {loading && (
        <StyledBox styled={{ margin: "12px" }}>
          <LoadingIndicator />
        </StyledBox>
      )}
    </>
  );
};

export default InfiniteScrollWrapper;
