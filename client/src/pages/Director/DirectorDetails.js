// Reusability
import React, { useState, useContext } from "react";
import { Typography, DialogContent, IconButton } from "@material-ui/core";
import MovieList from "pages/Movies/MovieList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import { ModalRouteContext } from "react-router-modal-gallery";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";

const DirectorDetails = ({ director, loading, onEditClick }) => {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { redirectToBack } = useContext(ModalRouteContext);

  const showDeleteConfirm = () => {
    setDeleteConfirmVisible(true);
  };

  const hideDeleteConfirm = () => {
    setDeleteConfirmVisible(false);
  };

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <React.Fragment>
      <BaseDialogTitle>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {director.name}
        </Typography>
        <AccessControl allowedRoles={[roles.ADMIN]}>
          <IconButton onClick={onEditClick}>
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={showDeleteConfirm}>
            <DeleteIcon color="secondary" fontSize="small" />
          </IconButton>
        </AccessControl>
      </BaseDialogTitle>

      <DialogContent>
        <Typography variant="subtitle1">Movies</Typography>
        {director.movies.length ? <MovieList movies={director.movies} /> : null}
      </DialogContent>

      <DeleteDirectorConfirmDialog
        open={deleteConfirmVisible}
        director={director}
        onClose={hideDeleteConfirm}
        onCompleted={redirectToBack}
      />
    </React.Fragment>
  );
};

export default DirectorDetails;
