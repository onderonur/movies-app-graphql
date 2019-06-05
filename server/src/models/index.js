import Sequelize from "sequelize";

/**
 * You will see the DATABASE_URL environment variable isn’t there. But you should see that it is set as Heroku environment
 * variable with heroku config:get DATABASE_URL. Once your application is live on Heroku, your environment variables are
 * merged with Heroku’s environment variables, which is why the DATABASE_URL isn’t applied for your local development environment.
 */
let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: "postgres" });
} else {
  sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
      dialect: "postgres",
      logging: false
    }
  );
}

const models = {
  Movie: sequelize.import("./movie"),
  Director: sequelize.import("./director"),
  User: sequelize.import("./user")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
