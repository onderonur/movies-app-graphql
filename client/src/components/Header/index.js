import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import AccountMenu from "./AccountMenu";
import StyledBox from "styled/StyledBox";
import DrawerToggler from "components/AppDrawer/DrawerToggler";
import SignUpButton from "./SignUpButton";
import { GET_USER_INFO } from "graphql/cache/queries";
import { Query } from "react-apollo";
import LoginButton from "./LoginButton";

export const ToolbarSpace = styled.div`
  ${props => props.theme.mixins.toolbar}
`;

const StyledAppBar = styled(AppBar)`
  && {
    z-index: ${props => props.theme.zIndex.drawer + 1};
  }
`;

const Header = ({ toggleDrawer }) => (
  <StyledAppBar position="fixed" color="inherit">
    <Toolbar>
      <DrawerToggler toggleDrawer={toggleDrawer} />
      <StyledBox styled={{ flexGrow: 1 }} />

      <Query query={GET_USER_INFO}>
        {({ data: { userInfo } }) => {
          const isLoggedIn = !!userInfo;

          return isLoggedIn ? (
            <AccountMenu />
          ) : (
            <React.Fragment>
              <LoginButton />
              <SignUpButton />
            </React.Fragment>
          );
        }}
      </Query>
    </Toolbar>
  </StyledAppBar>
);

export default Header;
