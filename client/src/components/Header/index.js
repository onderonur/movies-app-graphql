import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import AccountMenu from "./AccountMenu";
import DrawerToggler from "components/AppDrawer/DrawerToggler";
import SignUpButton from "./SignUpButton";
import { GET_USER_INFO } from "graphql/cache/queries";
import { Query } from "react-apollo";
import LoginButton from "./LoginButton";
import { makeStyles } from "@material-ui/core";

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
              <AccountMenu />
            ) : (
              <>
                <LoginButton />
                <SignUpButton />
              </>
            );
          }}
        </Query>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
