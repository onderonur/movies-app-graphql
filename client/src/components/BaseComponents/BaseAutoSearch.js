import React, { useState, useEffect, useRef } from "react";
import Downshift from "downshift";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import LoadingIndicator from "components/LoadingIndicator";
import { InputAdornment, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useDebounce from "hooks/useDebounce";

function AutoSearchInput({ InputProps, classes, ref, ...other }) {
  return (
    <TextField
      InputProps={{
        inputRef: ref,
        classes: {
          root: classes.inputRoot,
          input: classes.inputInput
        },
        ...InputProps
      }}
      {...other}
    />
  );
}

function AutoSearchSuggestion({
  suggestion,
  index,
  itemProps,
  highlightedIndex,
  selectedItem
}) {
  const isHighlighted = highlightedIndex === index;
  const isSelected = selectedItem ? selectedItem === suggestion.title : false;

  return (
    <MenuItem
      {...itemProps}
      selected={isHighlighted}
      component="div"
      style={{
        fontWeight: isSelected ? 600 : 400
      }}
    >
      {suggestion.title}
    </MenuItem>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  container: {
    flexGrow: 1,
    position: "relative"
  },
  paper: {
    position: "absolute",
    zIndex: 1,
    marginTop: theme.spacing(1),
    left: 0,
    right: 0
  },
  inputRoot: {
    flexWrap: "wrap"
  },
  inputInput: {
    width: "auto",
    flexGrow: 1
  }
}));

function BaseAutoSearch({
  label,
  placeholder = "Search",
  loading,
  suggestions = [],
  onSelect,
  onInputValueChange,
  onEnter,
  debounceMs = 250,
  autoFocus
}) {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState("");
  const prevDebouncedInputValue = useRef();

  const debouncedInputValue = useDebounce(inputValue, debounceMs);

  useEffect(() => {
    if (debouncedInputValue !== prevDebouncedInputValue.current) {
      onInputValueChange(debouncedInputValue);
    }
  }, [debouncedInputValue, onInputValueChange]);

  // Hooks rely on call order. Thus, if we place this "useEffect" before the above one,
  // it sets the "prevDebouncedInputValue" ref before calling that hook.
  // And it never calls "onInputValueChange", because current and prev inputValues would be same values.
  useEffect(() => {
    prevDebouncedInputValue.current = debouncedInputValue;
  }, [debouncedInputValue]);

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div className={classes.root}>
      <Downshift
        inputValue={inputValue}
        onSelect={onSelect}
        itemToString={item => (item ? item.title : "")}
      >
        {({
          getInputProps,
          getItemProps,
          getLabelProps,
          getMenuProps,
          highlightedIndex,
          isOpen,
          openMenu,
          closeMenu,
          selectedItem
        }) => {
          const { onChange, onBlur, onFocus, ...inputProps } = getInputProps({
            placeholder
          });

          return (
            <div className={classes.container}>
              <AutoSearchInput
                fullWidth={true}
                classes={classes}
                label={label}
                autoFocus={autoFocus}
                InputLabelProps={getLabelProps({ shrink: true })}
                InputProps={{
                  ...inputProps,
                  onChange: event => {
                    openMenu();
                    handleInputChange(event);
                    return onChange;
                  },
                  onBlur,
                  onFocus: e => {
                    openMenu();
                    return onFocus;
                  },
                  onKeyPress: e => {
                    if (e.key === "Enter") {
                      onEnter(inputValue);
                      closeMenu();
                    }
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        onClick={() => {
                          onEnter(inputValue);
                          closeMenu();
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <div {...getMenuProps()}>
                {isOpen ? (
                  <Paper className={classes.paper} square>
                    {loading ? (
                      <LoadingIndicator />
                    ) : (
                      suggestions.map((suggestion, index) => {
                        return (
                          <AutoSearchSuggestion
                            key={suggestion.id}
                            suggestion={suggestion}
                            index={index}
                            itemProps={getItemProps({
                              item: suggestion
                            })}
                            highlightedIndex={highlightedIndex}
                            selectedItem={selectedItem}
                          />
                        );
                      })
                    )}
                  </Paper>
                ) : null}
              </div>
            </div>
          );
        }}
      </Downshift>
    </div>
  );
}

export default BaseAutoSearch;
