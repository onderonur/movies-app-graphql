// OK
import React from "react";
import styled from "styled-components";
import { Checkbox } from "@material-ui/core";
import StarIcon from "@material-ui/icons/Star";
import MovieLikeMutation from "./MovieLikeMutation";

const StyledStarCheckbox = styled(Checkbox)`
  &&& {
    color: ${props => (props.checked ? "#e4bb24" : "#b4b4b4")};
  }
`;

const MovieLikeButton = ({ movieId, viewerHasLiked }) => (
  <MovieLikeMutation
    movieId={movieId}
    viewerHasLiked={viewerHasLiked}
  >
    {mutation => (
      <StyledStarCheckbox
        icon={<StarIcon />}
        checkedIcon={<StarIcon />}
        checked={viewerHasLiked}
        onChange={mutation}
        classes={{
          checked: "checked"
        }}
      />
    )}
  </MovieLikeMutation>
);

export default MovieLikeButton;
