import React from "react";
import { BaseButton } from ".";

const BaseFormActions = ({
  isSubmitting,
  onCancel,
  submitText = "Save",
  cancelText = "Cancel"
}) => (
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

export default BaseFormActions;
