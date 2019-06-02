// OK!!
import React from "react";
import MoviesFeed from "./MoviesFeed";
import GridListContainer from "components/GridListContainer";
import MovieGridListTile from "./MovieGridListTile";

function Movies() {
  return (
    <MoviesFeed>
      {({ movies, loading }) => (
        <GridListContainer
          items={movies}
          loading={loading}
          renderItem={({ item }) => (
            <MovieGridListTile key={item.id} movie={item} />
          )}
        />
      )}
    </MoviesFeed>
  );
}

export default Movies;
