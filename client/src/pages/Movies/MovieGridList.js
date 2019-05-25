import React from "react";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import withWidth, { isWidthUp } from "@material-ui/core/withWidth";
import { ModalLink } from "react-router-modal-gallery";
import paths from "constants/paths";
import MovieLikeButton from "./MovieLikeButton";
import styled from "styled-components";
import placeholderPng from "assets/placeholder.png";

const ImageBackground = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${props => props.imageUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const MovieGridList = ({ width, movies }) => {
  const getGridListCols = () => {
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
  };

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
};

export default withWidth()(MovieGridList);
