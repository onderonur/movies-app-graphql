// OK!!
import React from "react";
import * as Yup from "yup";
import { BaseTextField, BaseFormik } from "components/BaseComponents";
import { REQUIRED_ERROR } from "constants/formErrors";
import DirectorMutation from "./DirectorMutation";
import LoadingIndicator from "components/LoadingIndicator";
import { DialogContent } from "@material-ui/core";
import { BaseDialogForm } from "components/BaseComponents";
import ImageUrlInput from "pages/Movie/ImageUrlInput";

function DirectorForm({ director, loading, onSubmitCompleted, onCancel }) {
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
            name: director ? director.name : "",
            bio: director ? director.bio : ""
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().required(REQUIRED_ERROR),
            bio: Yup.string().required(REQUIRED_ERROR)
          })}
          onSubmit={handleSubmit(saveDirector)}
        >
          {({ isSubmitting, values }) => (
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
                margin="normal"
                autoFocus
              />
              <BaseTextField
                name="bio"
                label="Biography"
                required
                fullWidth
                margin="normal"
                multiline
                rowsMax={8}
              />
              <ImageUrlInput
                name="imageUrl"
                label="Image Url"
                fullWidth
                imgSrc={values.imageUrl}
              />
            </BaseDialogForm>
          )}
        </BaseFormik>
      )}
    </DirectorMutation>
  );
}

export default DirectorForm;
