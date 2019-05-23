import React from "react";
import {
  List,
  InfiniteLoader,
  WindowScroller,
  AutoSizer
} from "react-virtualized";
import LoadingIndicator from "components/LoadingIndicator";
import styled from "styled-components";

const StyledList = styled(List)`
  outline: none;
`;

const BaseInfiniteScroll = ({
  /** Are there more items to load? (This information comes from the most recent API request.) */
  hasNextPage,
  /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
  isNextPageLoading,
  /** List of items loaded so far */
  items,
  /** Callback function (eg. Redux action-creator) responsible for loading the next page of items */
  loadNextPage,
  /** Render method of row item content */
  itemRenderer,
  /** Height of a single row */
  rowHeight
}) => {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const rowCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreRows = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isRowLoaded = ({ index }) => !hasNextPage || index < items.length;

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
      <div key={key} style={style}>
        {content}
      </div>
    );
  };

  return (
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
              {({ width }) => (
                <StyledList
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowRenderer={rowRenderer}
                  height={height}
                  autoHeight
                  width={width}
                  rowHeight={rowHeight}
                  rowCount={rowCount}
                  scrollTop={scrollTop}
                />
              )}
            </AutoSizer>
          )}
        </WindowScroller>
      )}
    </InfiniteLoader>
  );
};

export default BaseInfiniteScroll;
