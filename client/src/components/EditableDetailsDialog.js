// OK!!
import React, { useState } from "react";
import { Query } from "react-apollo";
import { BaseDialog } from "./BaseComponents";
import { useModalGallery } from "react-router-modal-gallery";

function EditableDetailsDialog({
  id,
  renderDetails,
  renderForm,
  queryProps: { query, variables }
}) {
  const isNew = id === "new";
  const { redirectToBack } = useModalGallery();
  const [editing, setEditing] = useState(isNew);

  function startEditing() {
    setEditing(true);
  }

  function finishEditing() {
    setEditing(false);
  }

  return (
    <BaseDialog open maxWidth="md" onExited={redirectToBack}>
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
