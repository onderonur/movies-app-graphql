import directorResolvers from "../directors/director.resolvers";
import movieResolvers from "../movies/movie.resolvers";
import userResolvers from "../users/user.resolvers";
import customScalars from "../shared/customScalars.resolvers";

export default [
  directorResolvers,
  movieResolvers,
  userResolvers,
  customScalars
];
