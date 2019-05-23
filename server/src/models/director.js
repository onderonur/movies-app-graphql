const director = (sequelize, DataTypes) => {
  const Director = sequelize.define("director", {
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  Director.associate = models => {
    Director.hasMany(models.Movie);
  };

  Director.findByIdAndDelete = async id => {
    const directorToDelete = await Director.findByPk(id);

    if (directorToDelete) {
      const result = await directorToDelete.destroy();
      if (result) {
        return directorToDelete;
      }
    }
  };

  return Director;
};

export default director;
