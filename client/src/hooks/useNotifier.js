import React, { useContext } from "react";

// Creating a context to use pushNotification mutation globally without
// writing the same Mutation component every time we need it.
export const NotificationContext = React.createContext();

function useNotifier() {
  const notificationContext = useContext(NotificationContext);

  return notificationContext;
}

export default useNotifier;
