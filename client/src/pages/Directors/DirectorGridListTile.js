// OK!!
import React from "react";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import { ModalLink } from "react-router-modal-gallery";
import ImageBox from "components/ImageBox";

function DirectorGridListTile({ director, style }) {
  return (
    <GridListTile style={style}>
      <ModalLink to={`${paths.DIRECTORS}/${director.id}`}>
        <ImageBox src={director.imageUrl} />
      </ModalLink>
      <GridListTileBar title={director.name} />
    </GridListTile>
  );
}

export default DirectorGridListTile;
