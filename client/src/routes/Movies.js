import React, { useMemo } from "react";
import MoviesFeed from "components/MoviesFeed";
import GridListContainer from "components/GridListContainer";
import MovieGridListTile from "components/MovieGridListTile";
import queryString from "query-string";

function Movies({ location: { search } }) {
  const searcyQuery = useMemo(() => queryString.parse(search), [search]);
  const filter = {
    title: searcyQuery.title
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
