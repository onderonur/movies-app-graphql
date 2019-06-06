import "./polyfills";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from "./serviceWorker";
import theme from "./theme";
import { getDefaults, schema, resolvers } from "./graphql/cache";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";
import { GET_USER_INFO } from "./graphql/cache/queries";
import { UNAUTHENTICATED } from "./constants/errorCodes";
import {
  clearUserInfoFromStorage,
  pushNotificationToCache,
  showAuthModal
} from "./graphql/cache/resolvers";
import { ThemeProvider } from "@material-ui/styles";

const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers, cache }) => {
  // get the authentication info from cache
  const { userInfo } = cache.readQuery({ query: GET_USER_INFO });

  // return the headers to the context so httpLink can read them
  if (userInfo) {
    const { token } = userInfo;

    if (token) {
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : ""
        }
      };
    }
  }

  return headers;
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError, operation }) => {
      let clearedUserInfo = false;

      const { cache } = operation.getContext();

      if (graphQLErrors) {
        graphQLErrors.forEach(error => {
          if (error.extensions.code === UNAUTHENTICATED) {
            if (!clearedUserInfo) {
              clearUserInfoFromStorage();

              cache.writeData({ data: getDefaults() });

              showAuthModal(cache, "LOGIN");

              clearedUserInfo = true;
            }
          }
          // Show notification for the error
          pushNotificationToCache(cache, error.message);
        });

        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    authLink.concat(httpLink)
  ]),
  cache: new InMemoryCache(),
  resolvers,
  typeDefs: schema,
  // ApolloDevTools is disabled on the production environment
  connectToDevTools: process.env.NODE_ENV !== "production"
});

function initializeCache() {
  client.writeData({ data: getDefaults() });
}

// Initialize cache data by default states
initializeCache();

// Handle reset store
client.onResetStore(() => {
  initializeCache();
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
