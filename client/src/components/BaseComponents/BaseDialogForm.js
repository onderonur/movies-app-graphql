import React from "react";
import {
  BaseForm,
  BaseDialogTitle,
  BaseFormActions
} from "components/BaseComponents";
import {
  DialogContent,
  DialogActions,
  Divider,
  makeStyles
} from "@material-ui/core";

// TODO: Mobile modal'da content'i full uzatıp action'ları en alta koymak için bu kısım
// Daha iyi bi yöntem bulunursa o da olabilir
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto"
  }
}));

function BaseDialogForm({
  title,
  children,
  isSubmitting,
  onCancel,
  actions,
  defaultActions
}) {
  const classes = useStyles();

  return (
    <BaseForm className={classes.form}>
      <BaseDialogTitle>{title}</BaseDialogTitle>
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
