// OK
import React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_MOVIE, CREATE_MOVIE } from "graphql/movie/mutations";
import { GET_MOVIE, GET_MOVIES } from "graphql/movie/queries";
import { MovieEdge } from "constants/graphTypes";

const createMovieUpdate = (cache, { data: { createMovie } }) => {
  const { success, movie } = createMovie;

  if (success) {
    const getMoviesQuery = { query: GET_MOVIES };
    const cacheData = cache.readQuery(getMoviesQuery);

    const {
      movies: { edges }
    } = cacheData;

    const newNode = {
      node: movie,
      __typename: MovieEdge,
      movie
    };
    const newEdges = [newNode, ...edges];
    const data = {
      ...cacheData,
      movies: {
        ...cacheData.movies,
        edges: newEdges
      }
    };

    cache.writeQuery({ query: GET_MOVIES, data });
  }
};

const MovieMutation = ({ movie, onCompleted, children }) => (
  <Mutation
    mutation={movie ? UPDATE_MOVIE : CREATE_MOVIE}
    onCompleted={onCompleted}
    refetchQueries={
      movie ? [{ query: GET_MOVIE, variables: { id: movie.id } }] : []
    }
    update={movie ? undefined : createMovieUpdate}
  >
    {saveMovie => children(saveMovie)}
  </Mutation>
);

export default MovieMutation;
