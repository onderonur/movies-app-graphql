import { Op } from "sequelize";
import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, isAdmin } from "./authorization";

export default {
  Query: {
    movies: async (
      parent,
      { before, after, first, last, title },
      { models }
    ) => {
      // All the sorting and "$lt" "$gt" conditions are reversed.
      // Because we want to return the movies from new to old.

      // Because that we bulk create all of the movies, all of them have the same "createdAt" value.
      // Thus, we can't use this value for pagination.
      let filter = after
        ? { id: { [Op.lt]: after } }
        : before
        ? { id: { [Op.gt]: before } }
        : {};

      if (title) {
        filter = {
          ...filter,
          title: {
            [Op.iLike]: `%${title}%` // Op.iLike: Case insensitive (PG Only)
          }
        };
      }

      const limit = first || last;

      // Getting the paginated result and the total count
      let moviesWithTotalCount = await models.Movie.findAndCountAll({
        where: filter,
        order: [["id", last ? "ASC" : "DESC"]],
        limit
      });

      const movies = moviesWithTotalCount.rows;
      const totalCount = moviesWithTotalCount.count;

      const edges = movies.map(movie => ({
        node: movie,
        cursor: movie.id
      }));

      const startCursor = edges.length ? edges[0].cursor : null;

      const endCursor = edges.length ? edges[edges.length - 1].cursor : null;

      return {
        edges,
        totalCount,
        pageInfo: {
          startCursor,
          endCursor,
          hasNextPage() {
            if (!before) {
              if (last || (first && movies.length < first)) {
                return Promise.resolve(false);
              }
            }
            return models.Movie.findOne({
              where: {
                id: {
                  [Op.lt]: endCursor
                }
              }
            }).then(movie => !!movie);
          },
          hasPreviousPage() {
            if (!after) {
              if (first || (last && movies.length < last)) {
                return Promise.resolve(false);
              }
            }
            return models.Movie.findOne({
              where: {
                id: {
                  [Op.gt]: startCursor
                }
              }
            }).then(movie => !!movie);
          }
        }
      };
    },
    movie: async (parent, { id }, { models }) => {
      return await models.Movie.findByPk(id);
    }
  },
  Mutation: {
    createMovie: combineResolvers(
      isAdmin,
      async (parent, { movie }, { models }) => {
        const newMovie = await models.Movie.create(movie);

        if (!newMovie) {
          return {
            success: false,
            message: "Failed to create movie"
          };
        }

        return {
          success: true,
          message: "Successfully created movie",
          movie: newMovie
        };
      }
    ),
    updateMovie: combineResolvers(
      isAdmin,
      async (parent, { id, movie }, { models }) => {
        const updatedMovie = await models.Movie.findByIdAndUpdate(id, movie);

        if (updatedMovie) {
          return {
            success: true,
            message: "Successfully updated movie",
            movie: updatedMovie
          };
        }

        return {
          success: false,
          message: "Failed to update movie"
        };
      }
    ),
    deleteMovie: combineResolvers(
      isAdmin,
      async (parent, { id }, { models }) => {
        const deletedMovie = await models.Movie.findByIdAndDelete(id);

        if (deletedMovie) {
          return {
            success: true,
            message: "Successfully deleted movie",
            movie: deletedMovie
          };
        }

        return {
          success: false,
          message: "Failed to delete movie"
        };
      }
    ),
    likeMovie: combineResolvers(
      isAuthenticated,
      async (parent, { movieId }, { models, viewer }) => {
        try {
          const user = await models.User.findByPk(viewer.id);
          await user.addMovie(movieId);
          return {
            success: true,
            message: "You have liked this movie",
            movieLikedStatus: { movieId, viewerHasLiked: true }
          };
        } catch (err) {
          return {
            success: false,
            message: "Failed to like movie"
          };
        }
      }
    ),
    unlikeMovie: combineResolvers(
      isAuthenticated,
      async (parent, { movieId }, { models, viewer }) => {
        try {
          const user = await models.User.findByPk(viewer.id);
          await user.removeMovie(movieId);
          return {
            success: true,
            message: "You have unliked this movie",
            movieLikedStatus: { movieId, viewerHasLiked: false }
          };
        } catch (err) {
          return {
            success: false,
            message: "Failed to unlike movie"
          };
        }
      }
    )
  },
  Movie: {
    director: async ({ directorId }, args, { loaders }) => {
      // While the load() function takes each identifier individually,
      // it will batch all these identifiers into one set and request all users at the same time.
      // Instead of fetching each (duplicated) user on its own,
      // you fetch them all at once in one batched request with the dataloader package.
      return await loaders.directorLoader.load(directorId);
    },
    viewerHasLiked: async ({ id }, args, { loaders, viewer }) => {
      if (viewer) {
        const likedMovie = await loaders.likedMovieLoader.load(id);
        return !!likedMovie;
      }

      return false;
    }
  },
  PageInfo: {
    startCursor: ({ startCursor }) => startCursor,
    endCursor: ({ endCursor }) => endCursor,
    hasPreviousPage: ({ hasPreviousPage }) => hasPreviousPage(),
    hasNextPage: ({ hasNextPage }) => hasNextPage()
  },
  MutationResponse: {
    // TODO: Bu resolveType olayına bak gerekli mi
    __resolveType: parent => {
      if (parent.movie) {
        return "Movie";
      }
      if (parent.movieLikedStatus) {
        return "MovieLikedStatus";
      }
    }
  }
};
