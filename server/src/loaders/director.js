export const batchDirectors = async (keys, { models }) => {
  // We fetch the directors that has one of the "keys" as id
  // None of the keys are repeating
  // So we fetch any director only once
  const directors = await models.Director.findAll({
    where: {
      id: keys
    }
  });

  // The keys are mapped in the same order as the retrieved entities.
  // Otherwise, it’s possible to return directors right after their retrieval from the database,
  // though they have a different order than the incoming keys.
  return keys.map(key => directors.find(director => director.id === key));
};
