// OK
import React from "react";
import { List, ListSubheader, ListItem } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import styled from "styled-components";

const LoadingContainer = styled(ListItem)`
  && {
    display: flex;
    justify-content: center;
  }
`;

const BaseList = ({ subheader, items, renderListItem, loading }) => (
  <List
    subheader={subheader ? <ListSubheader>{subheader}</ListSubheader> : null}
  >
    {items.map((item, index) => renderListItem({ item, index }))}
    {loading && (
      <LoadingContainer>
        <LoadingIndicator />
      </LoadingContainer>
    )}
  </List>
);

export default BaseList;
