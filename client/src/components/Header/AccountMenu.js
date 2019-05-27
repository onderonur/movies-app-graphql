import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import LogoutMutation from "./LogoutMutation";

const LogoutButton = React.forwardRef((props, ref) => (
  <LogoutMutation {...props}>
    {clearUserInfo => <MenuItem onClick={clearUserInfo}>Logout</MenuItem>}
  </LogoutMutation>
));

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleOpenMenu(e) {
    setAnchorEl(e.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

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
        <LogoutButton />
      </Menu>
    </>
  );
}

export default AccountMenu;
