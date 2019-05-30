// OK!!
import React from "react";
import { List, ListSubheader, ListItem } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";

function BaseList({ subheader, items, renderListItem, loading }) {
  return (
    <List
      subheader={subheader ? <ListSubheader>{subheader}</ListSubheader> : null}
    >
      {items.map((item, index) => renderListItem({ item, index }))}
      {loading && (
        <ListItem>
          <LoadingIndicator />
        </ListItem>
      )}
    </List>
  );
}

export default BaseList;
