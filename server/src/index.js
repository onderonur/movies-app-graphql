// To use .env files
import "dotenv/config";

import express from "express";
import routes from "./routes";
import path from "path";

import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import models, { sequelize } from "./models";
import { seedData, getViewer } from "./utils";

import DataLoader from "dataloader";
import loaders from "./loaders";

const server = new ApolloServer({
  // It can happen that the GraphQL schema is not available in GraphQL Playground for application in production.
  // It’s because the "introspection" flag for Apollo Server is disabled. In order to fix it, you can set it to true.
  // Another improvement to add may be the playground flag to enable GraphQL Playground for Heroku:
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  context: async ({ req }) => {
    const viewer = await getViewer(req);

    return {
      models,
      viewer,
      secret: process.env.JWT_SECRET,
      loaders: {
        // A batch loading function accepts an Array of keys, and returns a Promise which resolves to an Array of values.
        // DataLoader allows you to decouple unrelated parts of your application without sacrificing the performance of
        // batch data-loading. While the loader presents an API that loads individual values, all concurrent requests
        // will be coalesced and presented to your batch loading function.
        directorLoader: new DataLoader(keys =>
          loaders.director.batchDirectors(keys, { models })
        ),
        likedMovieLoader: new DataLoader(keys =>
          loaders.movie.batchLikedMovies(keys, { models, viewer })
        )
      }
    };
  },
  formatError: error => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace("SequelizeValidationError: ", "")
      .replace("Validation error: ", "");

    return {
      ...error,
      message
    };
  }
});

const app = express();
server.applyMiddleware({ app });

app.use("/", routes);

const clientBuildPath = "../../client/build";

const isProduction = process.env.NODE_ENV === "production";

if (isProduction) {
  // Serve any static files
  app.use(express.static(path.join(__dirname, clientBuildPath)));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, clientBuildPath, "index.html"));
  });
}

// Heroku adds its own PORT environment variable, and you should use the port from an environment variable as a fallback.
const port = process.env.PORT || 8000;

// Remember to remove the flag after, or the database will be purged and seeded with every deployment.
// Depending on development or production, you are choosing a database, seeding it (or not), and selecting a
// port for your GraphQL server. Before pushing your application to Heroku, push all recent changes to your GitHub repository.
// After that, push all the changes to your Heroku remote repository as well, since you created a Heroku application before: git push heroku master.
sequelize.sync({ force: isProduction }).then(async () => {
  if (isProduction) {
    seedData();
  }

  app.listen({ port }, () => {
    if (!isProduction) {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server is listening on http://localhost:${port}`);
    }
  });
});
