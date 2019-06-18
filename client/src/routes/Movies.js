import React from "react";
import MoviesFeed from "components/MoviesFeed";
import GridListContainer from "components/GridListContainer";
import MovieGridListTile from "components/MovieGridListTile";
import useQueryString from "hooks/useQueryString";

function Movies({ location }) {
  const { title } = useQueryString({ location });
  const filter = {
    title
  };

  return (
    <MoviesFeed filter={filter}>
      {({ movies, loading }) => (
        <GridListContainer
          items={movies}
          loading={loading}
          renderItem={movie => (
            <MovieGridListTile key={movie.id} movie={movie} />
          )}
        />
      )}
    </MoviesFeed>
  );
}

export default Movies;
