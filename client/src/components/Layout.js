// OK
import React from "react";
import Header from "./Header";
import AppDrawer from "./AppDrawer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  main: {
    flexGrow: 1,
    padding: theme.spacing(1)
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
      <main className={classes.main}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
}

export default Layout;
