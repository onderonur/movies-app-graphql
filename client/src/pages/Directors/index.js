// OK!! TODO: Belki bu grid, maxWidth vs olayları var bi işte
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import { makeStyles } from "@material-ui/styles";
import { AdapterModalLink } from "components/BaseComponents/BaseLink";
import DirectorGridList from "./DirectorGridList";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 600,
    margin: "auto",
    padding: 0
  }
}));

function Directors() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ViewWithFloatingButton
        fabProps={{
          color: "primary",
          component: AdapterModalLink,
          to: `${paths.DIRECTORS}/new`,
          icon: AddIcon,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <DirectorGridList />
      </ViewWithFloatingButton>
    </div>
  );
}

export default Directors;
