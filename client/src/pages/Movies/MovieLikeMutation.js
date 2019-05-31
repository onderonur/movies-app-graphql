// OK!!
import React, { useContext } from "react";
import { NotificationContext } from "App";
import { Mutation } from "react-apollo";
import { LIKE_MOVIE, UNLIKE_MOVIE } from "graphql/movie/mutations";
import {
  MovieLikedMutationResponse,
  MovieLikedStatus
} from "constants/graphTypes";
import { MOVIE_FRAGMENT } from "graphql/movie/fragments";

function readMovieFragment(cache, id) {
  return cache.readFragment({
    id: `Movie:${id}`,
    fragment: MOVIE_FRAGMENT
  });
}

function writeMovieFragment(cache, id, data) {
  cache.writeFragment({
    id: `Movie:${id}`,
    fragment: MOVIE_FRAGMENT,
    data
  });
}

function likeMovieUpdate(
  cache,
  {
    data: {
      likeMovie: {
        movieLikedStatus: { movieId, viewerHasLiked }
      }
    }
  }
) {
  const movieFragment = readMovieFragment(cache, movieId);

  const data = { ...movieFragment, viewerHasLiked };

  writeMovieFragment(cache, movieId, data);
}

function unlikeMovieUpdate(
  cache,
  {
    data: {
      unlikeMovie: {
        movieLikedStatus: { movieId, viewerHasLiked }
      }
    }
  }
) {
  const movieFragment = readMovieFragment(cache, movieId);

  const data = { ...movieFragment, viewerHasLiked };

  writeMovieFragment(cache, movieId, data);
}

function MovieLikeMutation({ movieId, viewerHasLiked, children }) {
  const { pushNotification } = useContext(NotificationContext);

  const optimisticResponse = {
    __typename: MovieLikedMutationResponse,
    success: !viewerHasLiked,
    message: "Success Message",
    movieLikedStatus: {
      __typename: MovieLikedStatus,
      movieId,
      viewerHasLiked: !viewerHasLiked
    }
  };

  return (
    <Mutation
      mutation={viewerHasLiked ? UNLIKE_MOVIE : LIKE_MOVIE}
      variables={{ movieId }}
      optimisticResponse={
        viewerHasLiked
          ? { unlikeMovie: optimisticResponse }
          : { likeMovie: optimisticResponse }
      }
      update={viewerHasLiked ? unlikeMovieUpdate : likeMovieUpdate}
      onCompleted={data => {
        // Mutation name is reversed because of optimistic response.
        // It changes the "viewerHasLiked" prop before "onCompleted" runs.
        const { message } = viewerHasLiked ? data.likeMovie : data.unlikeMovie;

        if (message) {
          pushNotification({ variables: { message } });
        }
      }}
    >
      {mutation => children(mutation)}
    </Mutation>
  );
}

export default MovieLikeMutation;
