// OK!!
import React from "react";
import { GET_MOVIES } from "graphql/movie/queries";
import MovieListQuery from "./MovieListQuery";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";

function resolvePagingResponse(root) {
  const edges = root ? root.edges : [];
  const nodes = edges.map(edge => edge.node);

  const pageInfo = root ? root.pageInfo : null;
  const hasNextPage = pageInfo ? pageInfo.hasNextPage : null;

  return { nodes, hasNextPage };
}

function onLoadMore(fetchMore, movies, variables) {
  fetchMore({
    query: GET_MOVIES,
    variables: {
      ...variables,
      after: movies.pageInfo.endCursor
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newEdges = fetchMoreResult.movies.edges;
      const pageInfo = fetchMoreResult.movies.pageInfo;

      return {
        // Put the new movies at the end of the list and update `pageInfo`
        // so we have the new `endCursor` and `hasNextPage` values
        movies: {
          ...previousResult.movies,
          edges: [...previousResult.movies.edges, ...newEdges],
          pageInfo
        }
      };
    }
  });
}

function MoviesFeed({ filter, children }) {
  const variables = {
    first: 10,
    ...filter
  };

  return (
    <MovieListQuery variables={variables}>
      {({ loading, movies, fetchMore }) => {
        const { nodes, hasNextPage } = resolvePagingResponse(movies);
        return (
          <InfiniteScrollWrapper
            hasNextPage={hasNextPage}
            loading={loading}
            loadMore={() => onLoadMore(fetchMore, movies, variables)}
          >
            {children({ movies: nodes, loading })}
          </InfiniteScrollWrapper>
        );
      }}
    </MovieListQuery>
  );
}

export default MoviesFeed;
