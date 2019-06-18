import React from "react";
import { Mutation } from "react-apollo";
import { LIKE_MOVIE, UNLIKE_MOVIE } from "graphql/movie/mutations";
import {
  MovieLikedMutationResponse,
  MovieLikedStatus
} from "constants/graphTypes";
import { MOVIE_FRAGMENT } from "graphql/movie/fragments";
import { getCacheKey } from "graphql/cache/resolvers";
import useNotifier from "hooks/useNotifier";

function readMovieFragment(cache, cacheKey) {
  return cache.readFragment({
    id: cacheKey,
    fragment: MOVIE_FRAGMENT
  });
}

function writeMovieFragment(cache, cacheKey, data) {
  cache.writeFragment({
    id: cacheKey,
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
  const cacheKey = getCacheKey("Movie", movieId);
  const movieFragment = readMovieFragment(cache, cacheKey);

  const data = { ...movieFragment, viewerHasLiked };

  writeMovieFragment(cache, cacheKey, data);
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
  const cacheKey = getCacheKey("Movie", movieId);
  const movieFragment = readMovieFragment(cache, cacheKey);

  const data = { ...movieFragment, viewerHasLiked };

  writeMovieFragment(cache, cacheKey, data);
}

function MovieLikeMutation({ movieId, viewerHasLiked, children }) {
  const { pushNotification } = useNotifier();

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
