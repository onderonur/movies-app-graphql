// OK
import React from "react";
import { List, ListSubheader } from "@material-ui/core";

const BaseList = ({ subheader, items, renderListItem }) => (
  <List
    subheader={subheader ? <ListSubheader>{subheader}</ListSubheader> : null}
  >
    {items.map((item, index) => renderListItem({ item, index }))}
  </List>
);

export default BaseList;
