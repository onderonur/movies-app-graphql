// Reusability
import React, { useState } from "react";
import { Typography, DialogContent, IconButton, Grid } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { BaseDialogTitle, BaseGridList } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import ImageBox from "components/ImageBox";
import { makeStyles } from "@material-ui/styles";
import ShowMore from "components/ShowMore";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";

const useStyles = makeStyles(theme => ({
  profileImg: {
    maxHeight: 400
  },
  bio: {
    // TODO: Buna bi bak daha doğru bi kullanımı var mı?
    // Multiline text ve ilk satırları indent'li yapma vs genel bi bak
    whiteSpace: "pre-line",
    textAlign: "justify"
  }
}));

function DirectorDetails({ director, loading, onEditClick }) {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const { redirectToBack } = useModalGallery();
  const classes = useStyles();

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
      <BaseDialogTitle
        extra={
          <AccessControl allowedRoles={[roles.ADMIN]}>
            <IconButton onClick={onEditClick}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={showDeleteConfirm}>
              <DeleteIcon color="secondary" fontSize="small" />
            </IconButton>
          </AccessControl>
        }
      >
        {director.name}
      </BaseDialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <ImageBox className={classes.profileImg} src={director.imageUrl} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="h6">Biography</Typography>
            <ShowMore maxHeight={340}>
              <Typography className={classes.bio}>{director.bio}</Typography>
            </ShowMore>
          </Grid>
          <Grid item xs={12}>
            {director.movies.length ? (
              <>
                <Typography variant="h6">Movies</Typography>
                <BaseGridList
                  items={director.movies}
                  direction="horizontal"
                  renderItem={({ item }) => (
                    <MovieGridListTile key={item.id} movie={item} />
                  )}
                />
              </>
            ) : null}
          </Grid>
        </Grid>
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
