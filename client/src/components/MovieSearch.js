import React from "react";
import { IconButton, InputAdornment } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { withRouter } from "react-router-dom";
import paths from "constants/paths";
import { makeStyles } from "@material-ui/core/styles";
import { BaseFormik, BaseForm, BaseTextField } from "./BaseComponents";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%",
    maxWidth: 640,
    margin: "auto"
  }
}));

function MovieSearch({ history }) {
  const classes = useStyles();

  function handleSearch({ searchValue }) {
    history.push(
      `${paths.MOVIES}${searchValue ? `?title=${searchValue}` : ""}`
    );
  }

  return (
    <BaseFormik
      initialValues={{
        searchValue: ""
      }}
      onSubmit={values => handleSearch(values)}
    >
      <BaseForm className={classes.form}>
        <BaseTextField
          name="searchValue"
          placeholder="Search"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      </BaseForm>
    </BaseFormik>
  );
}

export default withRouter(MovieSearch);
