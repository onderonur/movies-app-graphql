import React from "react";
import { Typography, DialogContent, Grid } from "@material-ui/core";
import { BaseGridList } from "components/BaseComponents";
import DeleteDirectorConfirmDialog from "./DeleteDirectorConfirmDialog";
import LoadingIndicator from "components/LoadingIndicator";
import { useModalGallery } from "react-router-modal-gallery";
import MovieGridListTile from "pages/Movies/MovieGridListTile";
import Details from "components/Details";
import ReadMore from "components/ReadMore";
import { getNonDeletedItems } from "utils";

function DirectorDetails({ director, loading, onEditClick }) {
  const { redirectToBack } = useModalGallery();
  const directorMovies = director ? getNonDeletedItems(director.movies) : [];

  return loading ? (
    <DialogContent>
      <LoadingIndicator />
    </DialogContent>
  ) : (
    <Details
      title={director.name}
      imageUrl={director.imageUrl}
      imageAlt={director.name}
      topSection={
        <>
          <Typography variant="h6">Biography</Typography>
          <ReadMore maxLine={15}>{director.bio}</ReadMore>
        </>
      }
      bottomSection={
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {directorMovies.length ? (
              <>
                <Typography variant="h6">Movies</Typography>
                <BaseGridList
                  items={directorMovies}
                  direction="horizontal"
                  renderItem={movie => (
                    <MovieGridListTile key={movie.id} movie={movie} />
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
