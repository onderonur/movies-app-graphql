// OK
import React from "react";
import Header, { ToolbarSpace } from "./Header";
import StyledBox from "styled/StyledBox";
import styled from "styled-components";
import AppDrawer from "./AppDrawer";

const StyledMain = styled.main`
  flex-grow: 1;
  padding: ${props => props.theme.spacing.unit}px;
`;

const Layout = ({ children }) => {
  return (
    <StyledBox styled={{ display: "flex" }}>
      <AppDrawer>
        {({ toggleDrawer }) => <Header toggleDrawer={toggleDrawer} />}
      </AppDrawer>
      <StyledMain>
        <ToolbarSpace />
        {children}
      </StyledMain>
    </StyledBox>
  );
};

export default Layout;
