import React from "react";
import {
  BaseForm,
  BaseDialogTitle,
  BaseFormActions
} from "components/BaseComponents";
import {
  DialogContent,
  DialogActions,
  Typography,
  Divider
} from "@material-ui/core";

// TODO: İsmini değiştir.
// BaseForm, BaseFormik, BaseDialogForm vs'yi bi düzenle.
// Hatta belki BaseForm ve BaseFormik birleştirilebilir vs.
const BaseDialogForm = ({
  title,
  children,
  isSubmitting,
  onCancel,
  actions,
  defaultActions
}) => (
  <BaseForm>
    <BaseDialogTitle>
      {typeof title === "string" ? (
        <Typography variant="h6">{title}</Typography>
      ) : (
        title
      )}
    </BaseDialogTitle>

    <DialogContent>{children}</DialogContent>

    {actions !== null ? (
      <>
        <Divider />
        <DialogActions>
          {actions ? (
            actions
          ) : (
            <BaseFormActions
              isSubmitting={isSubmitting}
              submitText={
                defaultActions ? defaultActions.submitText : undefined
              }
              cancelText={
                defaultActions ? defaultActions.cancelText : undefined
              }
              onCancel={onCancel}
            />
          )}
        </DialogActions>
      </>
    ) : null}
  </BaseForm>
);

export default BaseDialogForm;
