// OK
import React from "react";
import * as Yup from "yup";
import { BaseTextField, BaseFormik } from "components/BaseComponents";
import { REQUIRED_ERROR } from "constants/formErrors";
import DirectorMutation from "./DirectorMutation";
import LoadingIndicator from "components/LoadingIndicator";
import { DialogContent } from "@material-ui/core";
import { BaseDialogForm } from "components/BaseComponents";

const DirectorForm = ({ director, loading, onSubmitCompleted, onCancel }) => {
  const newDirector = !director;

  const handleSubmit = saveDirector => (values, { setSubmitting }) => {
    const variables = newDirector
      ? { director: values }
      : { id: director.id, director: values };

    saveDirector({ variables: variables }).catch(() => setSubmitting(false));
  };

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <DirectorMutation director={director} onCompleted={onSubmitCompleted}>
      {saveDirector => (
        <BaseFormik
          initialValues={{
            name: director ? director.name : ""
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(REQUIRED_ERROR)
          })}
          onSubmit={handleSubmit(saveDirector)}
        >
          {({ isSubmitting }) => (
            <BaseDialogForm
              title="Director"
              isSubmitting={isSubmitting}
              onCancel={onCancel}
            >
              <BaseTextField
                name="name"
                label="Name"
                required
                fullWidth
                autoFocus
              />
            </BaseDialogForm>
          )}
        </BaseFormik>
      )}
    </DirectorMutation>
  );
};

export default DirectorForm;
