// OK!!
import React, { useState } from "react";
import { BaseAutoSearch } from "components/BaseComponents";
import MovieListQuery from "pages/Movies/MovieListQuery";
import { withRouter } from "react-router-dom";
import paths from "constants/paths";
import { pushToModalRoute } from "utils";

function MovieAutoComplete({ history, autoFocus }) {
  const [searchValue, setSearchValue] = useState("");

  function handleRedirect(inputValue) {
    history.push(`${paths.MOVIES}${inputValue ? `?title=${inputValue}` : ""}`);
  }

  function handleSelectMovie(selectedMovie) {
    pushToModalRoute(history, `${paths.MOVIES}/${selectedMovie.id}`);
  }

  function handleInputValueChange(inputValue) {
    setSearchValue(inputValue);
  }

  return (
    <MovieListQuery
      variables={{ first: 10, title: searchValue }}
      skip={!searchValue}
    >
      {({ loading, movies }) => {
        const nodes = movies ? movies.edges.map(edge => edge.node) : [];
        return (
          <BaseAutoSearch
            suggestions={nodes}
            loading={loading}
            onEnter={handleRedirect}
            onSelect={handleSelectMovie}
            onInputValueChange={handleInputValueChange}
            autoFocus={autoFocus}
          />
        );
      }}
    </MovieListQuery>
  );
}

export default withRouter(MovieAutoComplete);
