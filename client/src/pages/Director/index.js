// OK
import React, { useContext } from "react";
import DirectorDetails from "./DirectorDetails";
import DirectorForm from "./DirectorForm";
import paths from "constants/paths";
import { ModalRouteContext } from "react-router-modal-gallery";
import EditableDetailsDialog from "components/EditableDetailsDialog";
import { GET_DIRECTOR } from "graphql/director/queries";
import { BaseDialog } from "components/BaseComponents";

const Director = ({
  match: {
    params: { directorId }
  },
  history
}) => {
  const isNewDirector = directorId === "new";
  const { redirectToBack } = useContext(ModalRouteContext);

  return (
    <BaseDialog open onExited={redirectToBack}>
      <EditableDetailsDialog
        id={directorId}
        queryProps={{
          query: GET_DIRECTOR,
          variables: { id: directorId, withMovies: true }
        }}
        renderForm={({ data, loading, finishEditing }) => {
          const director = data ? data.director : null;

          return (
            <DirectorForm
              director={director}
              loading={loading}
              onSubmitCompleted={({ savedDirector }) => {
                if (isNewDirector) {
                  history.replace({
                    pathname: `${paths.DIRECTORS}/${savedDirector.id}`,
                    state: { modal: true }
                  });
                }

                finishEditing();
              }}
              onCancel={isNewDirector ? redirectToBack : finishEditing}
            />
          );
        }}
        renderDetails={({ data, loading, startEditing }) => {
          const director = data ? data.director : null;

          return (
            <DirectorDetails
              director={director}
              loading={loading}
              onEditClick={startEditing}
            />
          );
        }}
      />
    </BaseDialog>
  );
};

export default Director;
