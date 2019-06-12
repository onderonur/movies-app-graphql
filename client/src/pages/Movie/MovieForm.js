// OK
import React, { useContext } from "react";
import * as Yup from "yup";
import { NotificationContext } from "App";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import {
  BaseTextField,
  BaseFormik,
  BaseDialogForm
} from "components/BaseComponents";
import { REQUIRED_ERROR, INVALID_VALUE } from "constants/formErrors";
import DirectorSelect from "./DirectorSelect";
import MovieMutation from "./MovieMutation";
import { DialogContent } from "@material-ui/core";
import LoadingIndicator from "components/LoadingIndicator";
import ImageUrlInput from "components/ImageUrlInput";
import YoutubeIdInput from "components/YoutubeIdInput";
import YearSelect from "components/YearSelect";

function MovieForm({ movie, loading, onSubmitCompleted, onCancel }) {
  const { pushNotification } = useContext(NotificationContext);

  function handleSubmitCompleted(data) {
    const mutationResult = movie ? data.updateMovie : data.createMovie;
    const { success, message, movie: savedMovie } = mutationResult;
    if (success) {
      onSubmitCompleted({ savedMovie });
    }
    if (message) {
      pushNotification({ variables: { message } });
    }
  }

  const handleSubmit = saveMovie => values => {
    const variables = movie
      ? { id: movie.id, movie: values }
      : { movie: values };
    saveMovie({ variables: variables });
  };

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <AccessControl allowedRoles={[roles.ADMIN]}>
      <MovieMutation movie={movie} onCompleted={handleSubmitCompleted}>
        {(saveMovie, { loading }) => (
          <BaseFormik
            initialValues={{
              title: movie ? movie.title : "",
              year: movie ? movie.year : "",
              description: movie ? movie.description : "",
              directorId: movie ? movie.director.id : "",
              imageUrl: movie ? movie.imageUrl : "",
              youtubeId: movie ? movie.youtubeId : ""
            }}
            validationSchema={Yup.object().shape({
              title: Yup.string().required(REQUIRED_ERROR),
              year: Yup.number()
                .required(REQUIRED_ERROR)
                .moreThan(999, INVALID_VALUE("year"))
                .lessThan(10000, INVALID_VALUE("year")),
              description: Yup.string().required(REQUIRED_ERROR),
              directorId: Yup.string().required(REQUIRED_ERROR)
            })}
            onSubmit={handleSubmit(saveMovie)}
          >
            {({ values }) => (
              <BaseDialogForm
                title="Movie"
                isSubmitting={loading}
                onCancel={onCancel}
              >
                <BaseTextField
                  name="title"
                  label="Title"
                  fullWidth
                  required
                  margin="normal"
                  autoFocus
                />
                <YearSelect
                  name="year"
                  label="Year"
                  fullWidth
                  required
                  margin="normal"
                />
                <BaseTextField
                  name="description"
                  label="Description"
                  fullWidth
                  multiline
                  required
                  margin="normal"
                />
                <DirectorSelect
                  name="directorId"
                  label="Director"
                  fullWidth
                  required
                  margin="normal"
                />
                <ImageUrlInput
                  name="imageUrl"
                  label="Image Url"
                  fullWidth
                  margin="normal"
                  imgSrc={values.imageUrl}
                />
                <YoutubeIdInput
                  name="youtubeId"
                  label="Youtube Id"
                  fullWidth
                  margin="normal"
                  youtubeId={values.youtubeId}
                />
              </BaseDialogForm>
            )}
          </BaseFormik>
        )}
      </MovieMutation>
    </AccessControl>
  );
}

export default MovieForm;
