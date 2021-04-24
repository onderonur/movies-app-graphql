import { combineResolvers } from "graphql-resolvers";
import { isAdmin } from "../shared/authorization.utils";

export default {
  Query: {
    directors: async (parent, args, { models }) => {
      return await models.Director.findAll({ order: [["id", "DESC"]] });
    },
    director: async (parent, { id }, { models }) => {
      return await models.Director.findByPk(id);
    }
  },
  Mutation: {
    createDirector: combineResolvers(
      isAdmin,
      async (parent, { director }, { models }) => {
        const newDirector = await models.Director.create(director);

        if (!newDirector) {
          return {
            success: false,
            message: "Failed to create director"
          };
        }

        return {
          success: true,
          message: "Created director successfully",
          director: newDirector
        };
      }
    ),
    updateDirector: combineResolvers(
      isAdmin,
      async (parent, { id, director }, { models }) => {
        const result = await models.Director.update(director, {
          where: { id },
          // To retrieve the updated model
          returning: true
        });

        const [affectedRowCount, affectedRows] = result;

        if (affectedRowCount) {
          const { dataValues: updatedDirector } = affectedRows[0];
          if (updatedDirector) {
            return {
              success: true,
              message: "Updated director successfully",
              director: updatedDirector
            };
          }
        }

        return {
          success: false,
          message: "Failed to update director"
        };
      }
    ),
    deleteDirector: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const deletedDirector = await models.Director.findByIdAndDelete(id);

        if (!deletedDirector) {
          return {
            success: false,
            message: "Failed to delete director"
          };
        }

        return {
          success: true,
          message: "Deleted director successfully",
          director: deletedDirector
        };
      }
    )
  },
  Director: {
    movies: async ({ id }, args, { models }) => {
      return await models.Movie.findAll({ where: { directorId: id } });
    }
  },
  MutationResponse: {
    __resolveType: parent => {
      if (parent.director) {
        return "Director";
      }
    }
  }
};
