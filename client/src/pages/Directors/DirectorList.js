// OK
import React from "react";
import DirectorListItem from "./DirectorListItem";
import { BaseList } from "components/BaseComponents";
import LoadingIndicator from "components/LoadingIndicator";
import DirectorListQuery from "./DirectorListQuery";

const DirectorList = () => (
  <DirectorListQuery>
    {({ directors, loading }) => {
      if (loading) return <LoadingIndicator />;

      return (
        <BaseList
          items={directors}
          renderListItem={({ item }) => (
            <DirectorListItem key={item.id} director={item} />
          )}
        />
      );
    }}
  </DirectorListQuery>
);

export default DirectorList;
