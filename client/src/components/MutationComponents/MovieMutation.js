import React from "react";
import { Mutation } from "react-apollo";
import { UPDATE_MOVIE, CREATE_MOVIE } from "graphql/movie/mutations";
import { GET_MOVIE, GET_MOVIES } from "graphql/movie/queries";
import { MovieEdge } from "constants/graphTypes";

function createMovieUpdate(cache, { data: { createMovie } }) {
  const { success, movie } = createMovie;

  if (success) {
    const query = {
      query: GET_MOVIES,
      variables: {
        first: 10
      }
    };
    const cacheData = cache.readQuery(query);

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

    cache.writeQuery({ ...query, data });
  }
}

function MovieMutation({ movie, onCompleted, children }) {
  return (
    <Mutation
      mutation={movie ? UPDATE_MOVIE : CREATE_MOVIE}
      onCompleted={onCompleted}
      refetchQueries={
        movie ? [{ query: GET_MOVIE, variables: { id: movie.id } }] : []
      }
      update={movie ? undefined : createMovieUpdate}
    >
      {(saveMovie, { loading }) => children(saveMovie, { loading })}
    </Mutation>
  );
}

export default MovieMutation;
