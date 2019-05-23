// OK
import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { Mutation } from "react-apollo";
import { BaseButton } from "./BaseComponents";

const ConfirmDialog = ({ open, onClose, title, content, mutationProps }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{content}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <BaseButton onClick={onClose} color="primary">
        Cancel
      </BaseButton>
      <Mutation {...mutationProps}>
        {(mutation, { loading }) => (
          <BaseButton color="primary" loading={loading} onClick={mutation}>
            OK
          </BaseButton>
        )}
      </Mutation>
    </DialogActions>
  </Dialog>
);

export default ConfirmDialog;
