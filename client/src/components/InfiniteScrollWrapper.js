import React from "react";
import useInfiniteScroll from "hooks/useInfiniteScroll";
import { RootRef } from "@material-ui/core";
import LoadingIndicator from "./LoadingIndicator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  loadingContainer: {
    margin: theme.spacing(1)
  }
}));

function InfiniteScrollWrapper({ hasNextPage, loading, loadMore, children }) {
  const classes = useStyles();
  const infiniteContainerRef = useInfiniteScroll({
    hasNextPage,
    loading,
    loadMore
  });

  return (
    <>
      <RootRef rootRef={infiniteContainerRef}>{children}</RootRef>
      {loading && (
        <div className={classes.loadingContainer}>
          <LoadingIndicator />
        </div>
      )}
    </>
  );
}

export default InfiniteScrollWrapper;
