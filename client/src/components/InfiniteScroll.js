import React, { useEffect, useRef, useCallback } from "react";
import {
  InfiniteLoader,
  WindowScroller,
  AutoSizer,
  List,
  CellMeasurer,
  CellMeasurerCache
} from "react-virtualized";
import "react-virtualized/styles.css"; // only needs to be imported once
import LoadingIndicator from "../components/LoadingIndicator";
import styled from "styled-components";

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 60,
  fixedWidth: true
});

const StyledList = styled(List)`
  outline: none;
`;

const InfiniteScroll = ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  items,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  /** Render method of row item content */
  itemRenderer
}) => {
  // To dynamically set the size of rows
  const listRef = useRef(null);
  let resizeAllFlag = false;
  let mostRecentWidth = 0;

  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

  const resizeRow = index => {
    console.log("resizeRow");
    cellMeasurerCache.clear(index, 0);
    if (listRef.current) {
      listRef.current.recomputeRowHeights();
    }
  };

  const resizeAll = useCallback(() => {
    console.log("resizeAll");
    resizeAllFlag = false;
    cellMeasurerCache.clearAll();
    if (listRef.current) {
      listRef.current.recomputeRowHeights();
    }
  }, []);

  useEffect(() => {
    if (resizeAllFlag) {
      resizeAll();
    } else {
      const index = items.length;
      resizeRow(index);
    }
  }, [items.length, resizeAll, resizeAllFlag]);

  const isRowLoaded = ({ index }) => !!items[index];

  // Render a list item or a loading indicator.
  const rowRenderer = ({ index, isScrolling, key, parent, style }) => {
    let content;

    if (!isRowLoaded({ index })) {
      content = <LoadingIndicator />;
    } else {
      content = itemRenderer({
        item: items[index],
        index,
        isScrolling,
        key,
        style
      });
    }

    return (
      <CellMeasurer
        key={key}
        cache={cellMeasurerCache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>{content}</div>
      </CellMeasurer>
    );
  };

  return isNextPageLoading && !items.length ? (
    <LoadingIndicator />
  ) : (
    <InfiniteLoader
      isRowLoaded={isRowLoaded}
      loadMoreRows={loadMoreRows}
      rowCount={rowCount}
      threshold={10}
    >
      {({ onRowsRendered, registerChild }) => (
        <WindowScroller>
          {({ height, scrollTop, isScrolling }) => (
            <AutoSizer disableHeight>
              {({ width }) => {
                if (mostRecentWidth !== width) {
                  mostRecentWidth = width;
                  resizeAllFlag = true;
                  setTimeout(() => {
                    resizeAll();
                  }, 0);
                }

                return (
                  <StyledList
                    ref={ref => {
                      listRef.current = ref;
                      registerChild(ref);
                    }}
                    width={width}
                    autoHeight
                    height={height}
                    deferredMeasurementCache={cellMeasurerCache}
                    rowHeight={cellMeasurerCache.rowHeight}
                    rowCount={rowCount}
                    onRowsRendered={onRowsRendered}
                    rowRenderer={rowRenderer}
                    scrollTop={scrollTop}
                  />
                );
              }}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};

export default InfiniteScroll;
