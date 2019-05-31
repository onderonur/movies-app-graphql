// OK!!
import React from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles
} from "@material-ui/core";
import paths from "constants/paths";
import MovieLikeButton from "./MovieLikeButton";
import { ModalLink } from "react-router-modal-gallery";
import useGridListCols from "hooks/useGridListCols";
import FlexImage from "components/FlexImage";

const useStyles = makeStyles(theme => ({
  horizontal: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  }
}));

function MovieGridList({ direction = "vertical", movies, cols }) {
  const classes = useStyles();
  const defaultGridCols = useGridListCols({ direction });

  return (
    <GridList
      className={direction === "horizontal" ? classes.horizontal : undefined}
      cellHeight="auto"
      cols={cols || defaultGridCols}
      spacing={2}
    >
      {movies.map(movie => (
        <GridListTile key={movie.id}>
          <ModalLink to={`${paths.MOVIES}/${movie.id}`}>
            <FlexImage src={movie.imageUrl} />
          </ModalLink>
          <GridListTileBar
            title={movie.title}
            subtitle={movie.director ? movie.director.name : ""}
            actionIcon={
              <MovieLikeButton
                movieId={movie.id}
                viewerHasLiked={movie.viewerHasLiked}
              />
            }
          />
        </GridListTile>
      ))}
    </GridList>
  );
}

export default MovieGridList;
