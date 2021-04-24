export const batchLikedMovies = async (keys, { models, viewer }) => {
  const likedMovies = await models.User.getLikedMovies(viewer.id);

  return keys.map(key => likedMovies.find(movie => movie.id === key));
};
