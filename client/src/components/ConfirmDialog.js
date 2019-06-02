// OK!!
import React from "react";
import {
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { BaseButton, BaseDialog, BaseDialogTitle } from "./BaseComponents";
import ButtonWithMutation from "./ButtonWithMutation";

function ConfirmDialog({
  open,
  onClose,
  title,
  content,
  mutationProps,
  confirmText = "OK",
  cancelText = "Cancel"
}) {
  return (
    <BaseDialog
      fullScreen={false}
      hideCloseButton={true}
      open={open}
      onClose={onClose}
    >
      <BaseDialogTitle>{title}</BaseDialogTitle>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <BaseButton onClick={onClose} color="secondary">
          {cancelText}
        </BaseButton>
        <ButtonWithMutation {...mutationProps} color="primary">
          {confirmText}
        </ButtonWithMutation>
      </DialogActions>
    </BaseDialog>
  );
}

export default ConfirmDialog;
