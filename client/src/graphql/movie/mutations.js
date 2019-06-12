import gql from "graphql-tag";
import { MOVIE_FRAGMENT } from "./fragments";

export const CREATE_MOVIE = gql`
  mutation CreateMovie($movie: MovieInput!) {
    createMovie(movie: $movie) {
      success
      message
      movie {
        ...movie
        director {
          id
          name
        }
      }
    }
  }
  ${MOVIE_FRAGMENT}
`;

export const UPDATE_MOVIE = gql`
  mutation UpdateMovie($id: ID!, $movie: MovieInput!) {
    updateMovie(id: $id, movie: $movie) {
      success
      message
      movie {
        id
      }
    }
  }
`;

export const DELETE_MOVIE = gql`
  mutation DeleteMovie($movieId: ID!) {
    deleteMovie(id: $movieId) {
      success
      message
      movie {
        id
      }
    }
  }
`;

export const LIKE_MOVIE = gql`
  mutation LikeMovie($movieId: ID!) {
    likeMovie(movieId: $movieId) {
      success
      message
      movieLikedStatus {
        movieId
        viewerHasLiked
      }
    }
  }
`;

export const UNLIKE_MOVIE = gql`
  mutation UnlikeMovie($movieId: ID!) {
    unlikeMovie(movieId: $movieId) {
      success
      message
      movieLikedStatus {
        movieId
        viewerHasLiked
      }
    }
  }
`;
