import bcrypt from "bcryptjs";
import models from ".";

const user = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 42]
      }
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    role: {
      type: DataTypes.ENUM("ADMIN"),
      allowNull: true
    }
  });

  User.associate = models => {
    User.belongsToMany(models.Movie, { through: "user_movie" });
  };

  User.findByUsername = async username => {
    let user = await User.findOne({
      where: { username }
    });

    return user;
  };

  // a hook function that is executed every time a user entity is created:
  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.findByIdAndDelete = async id => {
    // To return the deleted record, we get it first.
    // Because "destroy" method only returns the count of affected rows.
    const userToDelete = await User.findByPk(id);

    if (userToDelete) {
      const result = await userToDelete.destroy();
      if (result) {
        return userToDelete;
      }
    }
  };

  User.getLikedMovies = async id => {
    const user = await User.findOne({
      where: { id },
      attributes: ["id"],
      include: [
        {
          model: models.Movie
        }
      ]
    });

    return user.movies;
  };

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    return await bcrypt.hash(this.password, saltRounds);
  };

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
