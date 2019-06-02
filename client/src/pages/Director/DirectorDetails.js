import React from "react";
import { Typography, DialogContent, Grid } from "@material-ui/core";
import { BaseGridList } from "components/BaseComponents";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import { makeStyles } from "@material-ui/styles";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";
import Details from "components/Details";

const useStyles = makeStyles(theme => ({
  bio: {
    // TODO: Buna bi bak daha doğru bi kullanımı var mı?
    // Multiline text ve ilk satırları indent'li yapma vs genel bi bak
    whiteSpace: "pre-line",
    textAlign: "justify"
  }
}));

function DirectorDetails({ director, loading, onEditClick }) {
  const { redirectToBack } = useModalGallery();
  const classes = useStyles();

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <Details
      title={director.name}
      imageUrl={director.imageUrl}
      topSection={
        <>
          <Typography variant="h6">Biography</Typography>
          <Typography className={classes.bio}>{director.bio}</Typography>
        </>
      }
      bottomSection={
        <Grid container spacing={2}>
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
      }
      onEditClick={onEditClick}
      renderDeleteConfirmModal={({ open, hideDeleteConfirm }) => (
        <DeleteDirectorConfirmDialog
          open={open}
          director={director}
          onClose={hideDeleteConfirm}
          onCompleted={redirectToBack}
        />
      )}
    />
  );
}

export default DirectorDetails;
