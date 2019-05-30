// OK!! TODO: Şu "fullscreen" prop'unu bi düzenle genel. Context vs yap ya da
import React from "react";
import {
  BaseForm,
  BaseDialogTitle,
  BaseFormActions
} from "components/BaseComponents";
import { DialogContent, DialogActions, Divider } from "@material-ui/core";

function BaseDialogForm({
  title,
  children,
  isSubmitting,
  onCancel,
  actions,
  defaultActions,
  fullScreen
}) {
  return (
    <BaseForm>
      <BaseDialogTitle fullScreen={fullScreen}>{title}</BaseDialogTitle>
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
}

export default BaseDialogForm;
