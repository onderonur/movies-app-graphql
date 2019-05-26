import React from "react";
import { BaseButton } from ".";

function BaseFormActions({
  isSubmitting,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel"
}) {
  return (
    <>
      {onCancel ? (
        <BaseButton color="secondary" onClick={onCancel}>
          {cancelText}
        </BaseButton>
      ) : null}
      <BaseButton color="primary" type="submit" loading={isSubmitting}>
        {submitText}
      </BaseButton>
    </>
  );
}

export default BaseFormActions;
