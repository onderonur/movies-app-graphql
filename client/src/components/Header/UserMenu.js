// OK!!
import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Mutation } from "react-apollo";
import { CLEAR_USER_INFO } from "graphql/cache/mutations";

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
        <Mutation mutation={CLEAR_USER_INFO}>
          {clearUserInfo => <MenuItem onClick={clearUserInfo}>Logout</MenuItem>}
        </Mutation>
      </Menu>
    </>
  );
}

export default AccountMenu;
