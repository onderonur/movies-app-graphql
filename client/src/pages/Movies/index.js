// OK
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import MoviesFeed from "./MoviesFeed";
import { BaseLink } from "components/BaseComponents";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: "auto"
  }
}));

function Movies() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ViewWithFloatingButton
        buttonProps={{
          color: "primary",
          toModal: true,
          component: BaseLink,
          to: `${paths.MOVIES}/new`,
          icon: <AddIcon />,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <MoviesFeed />
      </ViewWithFloatingButton>
    </div>
  );
}

export default Movies;
