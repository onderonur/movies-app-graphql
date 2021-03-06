import React from "react";
import GridListContainer from "components/GridListContainer";
import DirectorListQuery from "components/QueryComponents/DirectorListQuery";
import DirectorGridListTile from "components/DirectorGridListTile";

function Directors() {
  return (
    <DirectorListQuery>
      {({ directors, loading }) => (
        <GridListContainer
          loading={loading}
          items={directors}
          renderItem={director => (
            <DirectorGridListTile key={director.id} director={director} />
          )}
        />
      )}
    </DirectorListQuery>
  );
}

export default Directors;
