import React, { useState } from "react";
import { InputBase, IconButton, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import paths from "constants/paths";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    padding: "0 2px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 8
  }
}));

function MovieSearch({ history, className }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState("");

  function handleSearch() {
    history.push(
      `${paths.MOVIES}${searchValue ? `?title=${searchValue}` : ""}`
    );
  }

  function handlePressEnter(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function handleChange(e) {
    const value = e.target.value;
    setSearchValue(value);
  }

  return (
    <Paper className={clsx(classes.root, className)}>
      <InputBase
        className={classes.input}
        placeholder="Search"
        onChange={handleChange}
        onKeyPress={handlePressEnter}
      />
      <IconButton className={classes.iconButton} onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default withRouter(MovieSearch);
