// OK!!
import React from "react";
import Header from "./Header";
import AppDrawer from "./AppDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  main: {
    flex: 1,
    padding: theme.spacing(2)
  },
  toolbar: theme.mixins.toolbar
}));

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppDrawer>
        {({ toggleDrawer }) => <Header toggleDrawer={toggleDrawer} />}
      </AppDrawer>
      <Container component="main" className={classes.main}>
        <div className={classes.toolbar} />
        {children}
      </Container>
    </div>
  );
}

export default Layout;
