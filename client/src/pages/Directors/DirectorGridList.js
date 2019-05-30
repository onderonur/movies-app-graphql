// OK!!
import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import DirectorListQuery from "./DirectorListQuery";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import { ModalLink } from "react-router-modal-gallery";
import ImageBackground from "components/ImageBackground";
import placeholderPng from "assets/placeholder.png";
import useGridListCols from "hooks/useGridListCols";

function DirectorGridList() {
  const cols = useGridListCols();

  return (
    <DirectorListQuery>
      {({ directors, loading }) =>
        loading ? (
          <LoadingIndicator />
        ) : (
          <GridList cellHeight={268} cols={cols} spacing={2}>
            {directors.map(director => (
              <GridListTile key={director.id}>
                <ModalLink to={`${paths.DIRECTORS}/${director.id}`}>
                  <ImageBackground
                    imageUrl={director.imageUrl || placeholderPng}
                  />
                </ModalLink>
                <GridListTileBar title={director.name} />
              </GridListTile>
            ))}
          </GridList>
        )
      }
    </DirectorListQuery>
  );
}

export default DirectorGridList;
