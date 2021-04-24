import bcrypt from "bcryptjs";
import models from "../app/app.models";

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
        len: {
          // TODO: hash'lenmiş hali her türlü 6'yı geçiyor.
          // Buradaki kontrolü araştır.
          args: [6],
          msg: "Password length can be 6 at minimum"
        }
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
          model: models.Movie,
          attributes: ["id"]
        }
      ]
    });

    return user.movies;
  };

  User.prototype.generatePasswordHash = async function() {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(this.password, saltRounds);
    return passwordHash;
  };

  // a hook function that is executed every time a user entity is created:
  User.beforeCreate(async user => {
    user.password = await user.generatePasswordHash();
  });

  User.beforeUpdate(async user => {
    if (user.changed("password")) {
      user.password = await user.generatePasswordHash();
    }
  });

  User.prototype.validatePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
  };

  return User;
};

export default user;
