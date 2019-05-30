// OK!!
import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import UserMenu from "./UserMenu";
import DrawerToggler from "components/AppDrawer/DrawerToggler";
import { GET_USER_INFO } from "graphql/cache/queries";
import { Query } from "react-apollo";
import { makeStyles } from "@material-ui/core";
import ButtonWithMutation from "components/ButtonWithMutation";
import { SHOW_LOGIN_MODAL, SHOW_SIGNUP_MODAL } from "graphql/cache/mutations";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

function Header({ toggleDrawer }) {
  const classes = useStyles();

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        <DrawerToggler toggleDrawer={toggleDrawer} />

        <Query query={GET_USER_INFO}>
          {({ data: { userInfo } }) => {
            const isLoggedIn = !!userInfo;

            return isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <ButtonWithMutation color="inherit" mutation={SHOW_LOGIN_MODAL}>
                  Login
                </ButtonWithMutation>
                <ButtonWithMutation
                  color="inherit"
                  mutation={SHOW_SIGNUP_MODAL}
                >
                  Sign Up
                </ButtonWithMutation>
              </>
            );
          }}
        </Query>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
