import React, { useState } from "react";
import { DialogContent, IconButton, Grid } from "@material-ui/core";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Image from "components/Image";
import ShowMore from "./ShowMore";

const TOP_SECTION_MAX_HEIGHT = 400;

function Details({
  title,
  titleExtra,
  imageUrl,
  topSection,
  bottomSection,
  onEditClick,
  renderDeleteConfirmModal
}) {
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);

  function showDeleteConfirm() {
    setDeleteConfirmVisible(true);
  }

  function hideDeleteConfirm() {
    setDeleteConfirmVisible(false);
  }

  return (
    <>
      <BaseDialogTitle
        extra={
          <>
            {titleExtra}
            <AccessControl allowedRoles={[roles.ADMIN]}>
              <IconButton onClick={onEditClick}>
                <EditIcon fontSize="small" />
              </IconButton>
              <IconButton onClick={showDeleteConfirm}>
                <DeleteIcon color="secondary" fontSize="small" />
              </IconButton>
            </AccessControl>
          </>
        }
      >
        {title}
      </BaseDialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Image maxHeight={TOP_SECTION_MAX_HEIGHT} src={imageUrl} />
          </Grid>
          <Grid item xs={12} sm={8}>
            <ShowMore maxHeight={TOP_SECTION_MAX_HEIGHT}>{topSection}</ShowMore>
          </Grid>
        </Grid>
        {bottomSection}
      </DialogContent>

      {renderDeleteConfirmModal({
        open: deleteConfirmVisible,
        hideDeleteConfirm
      })}
    </>
  );
}

export default Details;
