import React, { useState } from "react";
import {
  DialogContent,
  IconButton,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  makeStyles
} from "@material-ui/core";
import { BaseDialogTitle } from "components/BaseComponents";
import AccessControl from "components/AccessControl";
import { roles } from "constants/roles";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Image from "components/Image";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ShowMore from "./ShowMore";

const TOP_SECTION_MAX_HEIGHT = 400;

const useStyles = makeStyles(theme => ({
  deleteText: {
    color: theme.palette.secondary.main
  }
}));

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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  function showDeleteConfirm() {
    setDeleteConfirmVisible(true);
  }

  function hideDeleteConfirm() {
    setDeleteConfirmVisible(false);
  }

  function handleOpenMenu(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function handlEditClick() {
    handleCloseMenu();
    onEditClick();
  }

  function handleDeleteClick() {
    handleCloseMenu();
    showDeleteConfirm();
  }

  return (
    <>
      <BaseDialogTitle
        extra={
          <>
            {titleExtra}
            <AccessControl allowedRoles={[roles.ADMIN]}>
              <IconButton onClick={handleOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handlEditClick}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDeleteClick}>
                  <ListItemIcon>
                    <DeleteIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText className={classes.deleteText}>
                    Delete
                  </ListItemText>
                </MenuItem>
              </Menu>
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
