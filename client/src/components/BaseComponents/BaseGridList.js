// OK!!
import React from "react";
import {
  GridList,
  GridListTile,
  makeStyles,
  Typography
} from "@material-ui/core";
import useGridListCols from "hooks/useGridListCols";
import LoadingIndicator from "components/LoadingIndicator";

const useStyles = makeStyles(theme => ({
  horizontal: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
}));

function BaseGridList({
  cellHeight = "auto",
  direction = "vertical",
  items = [],
  renderItem,
  loading,
  cols
}) {
  const classes = useStyles();
  const defaultGridCols = useGridListCols({ direction });

  const isHorizontal = direction === "horizontal";

  const loadingGridTile = (
    <GridListTile>
      <LoadingIndicator />
    </GridListTile>
  );

  return !loading && !items.length ? (
    <Typography variant="h6">Nothing Found</Typography>
  ) : (
    <>
      <GridList
        className={direction === "horizontal" ? classes.horizontal : undefined}
        cellHeight={cellHeight}
        cols={cols || defaultGridCols()}
        spacing={2}
      >
        {items.map(item => renderItem({ item }))}
        {loading && isHorizontal ? loadingGridTile : null}
      </GridList>
      {loading && !isHorizontal ? loadingGridTile : null}
    </>
  );
}

export default BaseGridList;
