// Reusability
import React, { useState, useContext } from "react";
import {
  Typography,
  DialogContent,
  IconButton,
  Divider
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import { ModalRouteContext } from "react-router-modal-gallery";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import MovieGridList from "pages/Movies/MovieGridList";

function DirectorDetails({ director, loading, onEditClick }) {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { redirectToBack } = useContext(ModalRouteContext);

  function showDeleteConfirm() {
    setDeleteConfirmVisible(true);
  }

  function hideDeleteConfirm() {
    setDeleteConfirmVisible(false);
  }

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <>
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
        {director.bio ? (
          <>
            <Typography variant="subtitle1">Bio</Typography>
            {/* TODO: Buna bi bak daha doğru bi kullanımı var mı? */}
            <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
              {director.bio}
            </Typography>
          </>
        ) : null}
        <Divider />
        <Typography variant="subtitle1">Movies</Typography>
        {director.movies.length ? (
          <MovieGridList
            direction="horizontal"
            movies={director.movies}
            cols={2}
          />
        ) : null}
      </DialogContent>

      <DeleteDirectorConfirmDialog
        open={deleteConfirmVisible}
        director={director}
        onClose={hideDeleteConfirm}
        onCompleted={redirectToBack}
      />
    </>
  );
}

export default DirectorDetails;
