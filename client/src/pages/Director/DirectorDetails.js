import React from "react";
import { Typography, DialogContent, Grid } from "@material-ui/core";
import { BaseGridList } from "components/BaseComponents";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";
import Details from "components/Details";
import ReadMore from "components/ReadMore";

function DirectorDetails({ director, loading, onEditClick }) {
  const { redirectToBack } = useModalGallery();

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
          <ReadMore maxLine={15} hasFade={false}>
            {director.bio}
          </ReadMore>
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
