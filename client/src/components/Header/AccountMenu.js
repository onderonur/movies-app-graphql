import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogoutMutation from "./LogoutMutation"

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right"
        }}
      >
        <LogoutMutation onCompleted={handleCloseMenu}>
          {clearUserInfo => <MenuItem onClick={clearUserInfo}>Logout</MenuItem>}
        </LogoutMutation>
      </Menu>
    </>
  );
};

export default AccountMenu;
