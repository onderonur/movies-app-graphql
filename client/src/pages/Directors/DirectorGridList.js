// OK!!
import React from "react";
import LoadingIndicator from "components/LoadingIndicator";
import DirectorListQuery from "./DirectorListQuery";
import { GridList, GridListTile, GridListTileBar } from "@material-ui/core";
import paths from "constants/paths";
import { ModalLink } from "react-router-modal-gallery";
import FlexImage from "components/FlexImage";
import useGridListCols from "hooks/useGridListCols";

function DirectorGridList() {
  const cols = useGridListCols();

  return (
    <DirectorListQuery>
      {({ directors, loading }) =>
        loading ? (
          <LoadingIndicator />
        ) : (
          <GridList cellHeight="auto" cols={cols} spacing={2}>
            {directors.map(director => (
              <GridListTile key={director.id}>
                <ModalLink to={`${paths.DIRECTORS}/${director.id}`}>
                  <FlexImage src={director.imageUrl} />
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
