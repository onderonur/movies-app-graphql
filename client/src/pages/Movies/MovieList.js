// OK
import React from "react";
import MovieListItem from "./MovieListItem";
import { BaseList } from "components/BaseComponents";

const MovieList = ({ movies, loading }) => {
  return (
    <BaseList
      items={movies}
      loading={loading}
      renderListItem={({ item }) => (
        <MovieListItem key={item.id} movie={item} />
      )}
    />
  );
};

export default MovieList;
