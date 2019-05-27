import React from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import MovieLikeButton from "./MovieLikeButton";
import placeholderPng from "assets/placeholder.png";
import { makeStyles } from "@material-ui/styles";
import useWidth from "hooks/useWidth";
import { isWidthUp } from "@material-ui/core/withWidth";
import { ModalLink } from "react-router-modal-gallery";

// TODO: Bunu düz div içinde img'ye çevir
const useStyles = makeStyles(theme => ({
  imgBackground: {
    width: "100%",
    height: "100%",
    backgroundImage: ({ imageUrl }) => `url(${imageUrl})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }
}));

function ImageBackground({ imageUrl }) {
  const classes = useStyles({ imageUrl });

  return <div className={classes.imgBackground} />;
}

function MovieGridList({ movies }) {
  const width = useWidth();

  function getGridListCols() {
    if (isWidthUp("xl", width)) {
      return 4;
    }

    if (isWidthUp("md", width)) {
      return 3;
    }

    if (isWidthUp("sm", width)) {
      return 2;
    }

    return 1;
  }

  return (
    <GridList cellHeight={268} cols={getGridListCols()} spacing={2}>
      {movies.map(movie => (
        <GridListTile key={movie.id}>
          <ModalLink to={`${paths.MOVIES}/${movie.id}`}>
            <ImageBackground imageUrl={movie.imageUrl || placeholderPng} />
          </ModalLink>
          <GridListTileBar
            title={movie.title}
            subtitle={movie.director.name}
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
