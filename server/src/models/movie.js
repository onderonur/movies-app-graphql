const movie = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movie", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "A movie has to have a title."
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING
    },
    youtubeId: {
      type: DataTypes.STRING
    }
  });

  Movie.associate = models => {
    Movie.belongsTo(models.Director, { onDelete: "CASCADE" });
    Movie.belongsToMany(models.User, { through: "user_movie" });
  };

  Movie.findByIdAndUpdate = async (id, input) => {
    const [affectedRowCount, affectedRows] = await Movie.update(input, {
      where: { id },
      // To retrieve the updated model
      returning: true
    });

    if (affectedRowCount) {
      const { dataValues: updatedMovie } = affectedRows[0];
      return updatedMovie;
    }

    return null;
  };

  Movie.findByIdAndDelete = async id => {
    // To return the deleted record, we get it first.
    // Because "destroy" method only returns the count of affected rows.
    const movieToDelete = await Movie.findByPk(id);

    if (movieToDelete) {
      const result = await movieToDelete.destroy();
      if (result) {
        return movieToDelete;
      }
    }
  };

  return Movie;
};

export default movie;
