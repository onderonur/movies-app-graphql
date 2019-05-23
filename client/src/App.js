import React from "react";
import Layout from "./components/Layout";
import { createGlobalStyle } from "styled-components";
import Routes from "./Routes";
import Notifier from "./components/Notifier";
import { Query, Mutation } from "react-apollo";
import {
  PUSH_NOTIFICATION,
  SHIFT_NOTIFICATIONS
} from "./graphql/cache/mutations";
import { GET_NOTIFICATIONS } from "./graphql/cache/queries";
import AuthModal from "./components/AuthModal";

const GlobayStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme.palette.background.paper};
    font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  }
`;

// Creating a context to use pushNotification mutation globally without
// writing the same Mutation component every time we need it.
export const NotificationContext = React.createContext();

const App = () => (
  <React.Fragment>
    <GlobayStyle />
    <Mutation mutation={PUSH_NOTIFICATION}>
      {pushNotification => (
        <React.Fragment>
          <NotificationContext.Provider value={{ pushNotification }}>
            <Layout>
              <Routes />
            </Layout>
            <AuthModal />
          </NotificationContext.Provider>
          <Query query={GET_NOTIFICATIONS}>
            {({ data: { notifications } }) => (
              <Mutation mutation={SHIFT_NOTIFICATIONS}>
                {shiftNotifications => (
                  <Notifier
                    queue={notifications}
                    shiftNotifications={shiftNotifications}
                  />
                )}
              </Mutation>
            )}
          </Query>
        </React.Fragment>
      )}
    </Mutation>
  </React.Fragment>
);

export default App;
