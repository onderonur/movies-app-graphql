import React from "react";
import { Route, Redirect } from "react-router-dom";
import Directors from "routes/Directors";
import Movies from "routes/Movies";
import paths from "constants/paths";
import Director from "routes/Director";
import Movie from "routes/Movie";
import { ModalSwitch, ModalRoute } from "react-router-modal-gallery";

const idRegex = "(\\d+|new)";

const modalRoutes = [
  {
    defaultParentPath: "/movies",
    path: `/movies/:movieId${idRegex}`,
    component: Movie
  },
  {
    defaultParentPath: "/directors",
    path: `/directors/:directorId${idRegex}`,
    component: Director
  }
];

const modalRoutesArray = modalRoutes.map(route => (
  <ModalRoute key={route.path} {...route} />
));

function Routes() {
  return (
    <ModalSwitch renderModal={() => modalRoutesArray}>
      <Route exact path={paths.MOVIES} component={Movies} />
      <Route exact path={paths.DIRECTORS} component={Directors} />
      {modalRoutesArray}
      <Route path="*" render={() => <Redirect to="/movies" />} />
    </ModalSwitch>
  );
}

export default Routes;
