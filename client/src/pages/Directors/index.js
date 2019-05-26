// OK
import React from "react";
import DirectorList from "./DirectorList";
import AddIcon from "@material-ui/icons/Add";
import paths from "constants/paths";
import { roles } from "constants/roles";
import ViewWithFloatingButton from "components/ViewWithFloatingButton";
import { BaseLink } from "components/BaseComponents";
import { makeStyles } from "@material-ui/styles";

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
        buttonProps={{
          color: "primary",
          toModal: true,
          component: BaseLink,
          to: `${paths.DIRECTORS}/new`,
          icon: <AddIcon />,
          allowedRolesToClick: [roles.ADMIN]
        }}
      >
        <DirectorList />
      </ViewWithFloatingButton>
    </div>
  );
}

export default Directors;
