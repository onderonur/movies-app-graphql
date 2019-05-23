// OK
import React from "react";
import { GET_MOVIES } from "graphql/movie/queries";
import LoadingIndicator from "components/LoadingIndicator";
import MovieListQuery from "./MovieListQuery";
import { List } from "@material-ui/core";
import MovieListItem from "./MovieListItem";
import { BaseInfiniteScroll } from "components/BaseComponents";

const ITEM_HEIGHT = 58;

const resolvePagingResponse = root => {
  const edges = root ? root.edges : [];
  const nodes = edges.map(edge => edge.node);

  const pageInfo = root ? root.pageInfo : null;
  const hasNextPage = pageInfo ? pageInfo.hasNextPage : null;

  return { nodes, hasNextPage };
};

const onLoadMore = (fetchMore, movies) => () => {
  fetchMore({
    query: GET_MOVIES,
    variables: {
      after: movies.pageInfo.endCursor
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      const newEdges = fetchMoreResult.movies.edges;
      const pageInfo = fetchMoreResult.movies.pageInfo;

      // TODO: This is to fix the "duplicate items on fetchMore" bug.
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
};

const MoviesFeed = () => {
  return (
    <MovieListQuery>
      {({ loading, movies, fetchMore }) => {
        if (loading && !movies) {
          return <LoadingIndicator />;
        }

        const { nodes, hasNextPage } = resolvePagingResponse(movies);

        return (
          <List>
            {/* <InfiniteScroll
                hasNextPage={hasNextPage}
                isNextPageLoading={loading}
                loadNextPage={onLoadMore(fetchMore, movies)}
                items={nodes}
                itemRenderer={({ item }) => {
                  const movie = item;

                  return (
                    <MovieListItem
                      movie={movie}
                    />
                  );
                }}
              /> */}
            <BaseInfiniteScroll
              hasNextPage={hasNextPage}
              isNextPageLoading={loading}
              loadNextPage={onLoadMore(fetchMore, movies)}
              rowHeight={ITEM_HEIGHT}
              items={nodes}
              itemRenderer={({ item }) => {
                const movie = item;

                return <MovieListItem movie={movie} />;
              }}
            />
          </List>
        );
      }}
    </MovieListQuery>
  );
};

export default MoviesFeed;
