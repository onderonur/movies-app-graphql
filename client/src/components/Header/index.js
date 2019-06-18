import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import UserMenu from "./UserMenu";
import DrawerToggle from "components/AppDrawer/DrawerToggle";
import { makeStyles, Box, IconButton } from "@material-ui/core";
import ButtonWithMutation from "components/ButtonWithMutation";
import { SHOW_LOGIN_MODAL, SHOW_SIGNUP_MODAL } from "graphql/cache/mutations";
import useDetectMobile from "hooks/useDetectMobile";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import MovieAutoSearch from "components/MovieAutoSearch";
import UserInfoQuery from "components/QueryComponents/UserInfoQuery";

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  }
}));

function Header({ toggleDrawer }) {
  const classes = useStyles();
  const isMobile = useDetectMobile();
  const [mobileSearchMode, setMobileSearchMode] = useState();

  useEffect(() => {
    setMobileSearchMode(false);
  }, [isMobile]);

  function handleToggleSearchMode() {
    setMobileSearchMode(!mobileSearchMode);
  }

  return (
    <AppBar position="fixed" color="inherit" className={classes.appBar}>
      <Toolbar>
        {isMobile && mobileSearchMode ? (
          <>
            <IconButton onClick={handleToggleSearchMode}>
              <CloseIcon />
            </IconButton>
            <MovieAutoSearch autoFocus />
          </>
        ) : (
          <>
            <DrawerToggle toggleDrawer={toggleDrawer} />

            <Box
              flex={1}
              display="flex"
              justifyContent={isMobile ? "flex-end" : "center"}
              mx={isMobile ? 0 : 2}
            >
              {isMobile ? (
                <IconButton onClick={handleToggleSearchMode}>
                  <SearchIcon />
                </IconButton>
              ) : (
                <Box width="100%" maxWidth={640}>
                  <MovieAutoSearch />
                </Box>
              )}
            </Box>

            <UserInfoQuery>
              {({ isLoggedIn }) => {
                return isLoggedIn ? (
                  <UserMenu />
                ) : (
                  <>
                    <ButtonWithMutation
                      color="inherit"
                      mutation={SHOW_LOGIN_MODAL}
                    >
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
            </UserInfoQuery>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
