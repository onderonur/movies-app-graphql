// OK
import React, { useCallback } from "react";
import { GET_MOVIES } from "graphql/movie/queries";
import MovieListQuery from "./MovieListQuery";
import InfiniteScrollWrapper from "components/InfiniteScrollWrapper";
import LoadingIndicator from "components/LoadingIndicator";
import StyledBox from "styled/StyledBox";
import MovieGridList from "./MovieGridList";

const resolvePagingResponse = root => {
  const edges = root ? root.edges : [];
  const nodes = edges.map(edge => edge.node);

  const pageInfo = root ? root.pageInfo : null;
  const hasNextPage = pageInfo ? pageInfo.hasNextPage : null;

  return { nodes, hasNextPage };
};

const Deneme = ({ movies, loading, fetchMore, endCursor, width }) => {
  const onLoadMore = useCallback(() => {
    fetchMore({
      query: GET_MOVIES,
      variables: {
        after: endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.movies.edges;
        const pageInfo = fetchMoreResult.movies.pageInfo;

        // TODO: This is to fix the "duplicate items on fetchMore" bug of react-apollo.
        // It occurs on too quick "fetchMore" + InfiniteScroll.
        // Make "first" variable of "GET_MOVIES" query 1 or 2 etc.
        // Make "threshold" of InfiniteScroll>InfiniteLoader 0.
        // Remove this duplication filter and bug occurs.
        const prevIds = previousResult.movies.edges.map(
          prevEdge => prevEdge.node.id
        );
        const diff = newEdges.filter(edge => !prevIds.includes(edge.node.id));

        if (!diff.length) {
          console.log("Duplicate items on fetchMore: MoviesFeed");
          return previousResult;
        }

        return {
          // Put the new movies at the end of the list and update `pageInfo`
          // so we have the new `endCursor` and `hasNextPage` values
          movies: {
            __typename: previousResult.movies.__typename,
            edges: [...previousResult.movies.edges, ...diff],
            pageInfo
          }
        };
      }
    });
  }, [fetchMore, endCursor]);

  const { nodes, hasNextPage } = resolvePagingResponse(movies);

  return (
    <>
      <InfiniteScrollWrapper
        itemCount={nodes.length}
        hasNextPage={hasNextPage}
        loading={loading}
        loadMore={onLoadMore}
      >
        <MovieGridList movies={nodes} />
      </InfiniteScrollWrapper>
      {loading && (
        <StyledBox styled={{ margin: "12px" }}>
          <LoadingIndicator />
        </StyledBox>
      )}
    </>
  );
};

const MoviesFeed = () => {
  return (
    <MovieListQuery>
      {({ loading, movies, fetchMore }) => {
        const endCursor = movies ? movies.pageInfo.endCursor : null;
        return (
          <Deneme
            loading={loading}
            movies={movies}
            fetchMore={fetchMore}
            endCursor={endCursor}
          />
        );
      }}
    </MovieListQuery>
  );
};

export default MoviesFeed;
