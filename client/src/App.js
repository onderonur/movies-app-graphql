import React from "react";
import Layout from "./components/Layout";
import Routes from "./Routes";
import Notifier from "./components/Notifier";
import { Query, Mutation } from "react-apollo";
import {
  PUSH_NOTIFICATION,
  SHIFT_NOTIFICATIONS
} from "./graphql/cache/mutations";
import { GET_NOTIFICATIONS } from "./graphql/cache/queries";
import AuthModal from "./components/AuthModal";
import { CssBaseline } from "@material-ui/core";
import { NotificationContext } from "hooks/useNotifier";

function App() {
  return (
    <>
      <CssBaseline />
      <Mutation mutation={PUSH_NOTIFICATION}>
        {pushNotification => (
          <>
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
          </>
        )}
      </Mutation>
    </>
  );
}

export default App;
