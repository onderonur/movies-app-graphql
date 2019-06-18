import { seedData } from "./utils";
import express from "express";
import models from "./models";

const isDevEnv = process.env.NODE_ENV === "development";

const routes = express.Router();

// To initialize the db
routes.get("/seed-data", (req, res) => {
  if (isDevEnv) {
    seedData().then(() => {
      res.json({
        msg: "Data is ready"
      });
    });
  }
});

// To clear the db
routes.get("/clear-data", (req, res) => {
  if (isDevEnv) {
    Promise.all([
      models.Movie.destroy({ where: {} }),
      models.Director.destroy({ where: {} }),
      models.User.destroy({ where: {} })
    ]).then(() => {
      res.json({
        msg: "Data is cleared"
      });
    });
  }
});

export default routes;
