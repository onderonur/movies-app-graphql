// OK!!
import React, { useState, useContext } from "react";
import { ModalRouteContext } from "react-router-modal-gallery";
import { Query } from "react-apollo";
import { BaseDialog } from "./BaseComponents";

function EditableDetailsDialog({
  id,
  renderDetails,
  renderForm,
  queryProps: { query, variables }
}) {
  const isNew = id === "new";
  const { redirectToBack } = useContext(ModalRouteContext);
  const [editing, setEditing] = useState(isNew);

  function startEditing() {
    setEditing(true);
  }

  function finishEditing() {
    setEditing(false);
  }

  return (
    <BaseDialog open onExited={redirectToBack}>
      <Query query={query} variables={variables} skip={isNew}>
        {({ data, loading, error }) => {
          if (error) {
            return `Error! ${error.message}`;
          }

          return isNew || editing
            ? renderForm({ data, loading, finishEditing })
            : renderDetails({ data, loading, startEditing });
        }}
      </Query>
    </BaseDialog>
  );
}

export default EditableDetailsDialog;
