import React from "react";
import { Query, Mutation } from "react-apollo";
import { GET_DARK_THEME } from "graphql/cache/queries";
import { TOGGLE_DARK_THEME } from "graphql/cache/mutations";
import { Switch } from "@material-ui/core";

function ThemeToggle() {
  return (
    <Query query={GET_DARK_THEME}>
      {({ data }) => {
        const { darkTheme } = data;
        return (
          <Mutation mutation={TOGGLE_DARK_THEME}>
            {toggleDarkTheme => {
              return (
                <Switch
                  checked={darkTheme}
                  onChange={() => toggleDarkTheme()}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default ThemeToggle;
