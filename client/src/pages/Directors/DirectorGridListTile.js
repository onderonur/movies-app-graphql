// OK!!
import React from "react";
import { GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import { ModalLink } from "react-router-modal-gallery";
import Image from "components/Image";

function DirectorGridListTile({
  director,
  // GridList component adds "style" prop to its children to create the cols etc.
  // So, we need to forward this prop like this.
  style
}) {
  return (
    <GridListTile style={style}>
      <ModalLink to={`${paths.DIRECTORS}/${director.id}`}>
        <Image src={director.imageUrl} />
      </ModalLink>
      <GridListTileBar title={director.name} />
    </GridListTile>
  );
}

export default DirectorGridListTile;
