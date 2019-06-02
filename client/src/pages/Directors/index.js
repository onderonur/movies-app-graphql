// OK!!
import React from "react";
import GridListContainer from "components/GridListContainer";
import DirectorListQuery from "./DirectorListQuery";
import DirectorGridListTile from "./DirectorGridListTile";

function Directors() {
  return (
    <DirectorListQuery>
      {({ directors, loading }) => (
        <GridListContainer
          loading={loading}
          items={directors}
          renderItem={({ item }) => (
            <DirectorGridListTile key={item.id} director={item} />
          )}
        />
      )}
    </DirectorListQuery>
  );
}

export default Directors;
