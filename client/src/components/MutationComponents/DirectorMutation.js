import React from "react";
import { Mutation } from "react-apollo";
import { GET_DIRECTORS } from "graphql/director/queries";
import { CREATE_DIRECTOR, UPDATE_DIRECTOR } from "graphql/director/mutations";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import useNotifier from "hooks/useNotifier";

function DirectorMutation({ director, onCompleted, children }) {
  const { pushNotification } = useNotifier();

  const newDirector = !director;

  function handleCompleted(data) {
    const mutationResult = newDirector
      ? data.createDirector
      : data.updateDirector;
    const { success, message, director: savedDirector } = mutationResult;
    if (message) {
      pushNotification({ variables: { message } });
    }
    if (success) {
      onCompleted({ savedDirector });
    }
  }

  return (
    <AccessControl allowedRoles={[roles.ADMIN]}>
      <Mutation
        mutation={newDirector ? CREATE_DIRECTOR : UPDATE_DIRECTOR}
        refetchQueries={
          // Refetching directors list if a new director is created.
          // We don't need to refetch if there is an update to an existing director.
          // Because we obtain id and updated field as mutation result and apollo updated
          // the entity in the cache automatically.
          newDirector ? [{ query: GET_DIRECTORS }] : []
        }
        onCompleted={handleCompleted}
      >
        {(saveDirector, { loading }) => children(saveDirector, { loading })}
      </Mutation>
    </AccessControl>
  );
}

export default DirectorMutation;
