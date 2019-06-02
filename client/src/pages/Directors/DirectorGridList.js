// OK!!
import React from "react";
import DirectorListQuery from "./DirectorListQuery";
import { BaseGridList } from "components/BaseComponents";
import DirectorGridListTile from "./DirectorGridListTile";

function DirectorGridList() {
  return (
    <DirectorListQuery>
      {({ directors, loading }) => (
        <BaseGridList
          items={directors}
          loading={loading}
          renderItem={({ item }) => (
            <DirectorGridListTile key={item.id} director={item} />
          )}
        />
      )}
    </DirectorListQuery>
  );
}

export default DirectorGridList;
