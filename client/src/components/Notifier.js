// OK
import React, { useEffect, useReducer, useCallback, useRef } from "react";
import { Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const initialState = {
  open: false,
  notificationInfo: null
};

const SHOW_MESSAGE = "SHOW_MESSAGE";
const HIDE_MESSAGE = "HIDE_MESSAGE";

function notifierReducer(state, action) {
  switch (action.type) {
    case SHOW_MESSAGE:
      return {
        ...state,
        notificationInfo: action.notificationInfo,
        open: true
      };
    case HIDE_MESSAGE:
      return { ...state, open: false };
    default:
      return state;
  }
}

function Notifier({ queue, shiftNotifications }) {
  const [state, dispatch] = useReducer(notifierReducer, initialState);
  const isVisible = useRef(false);

  const { open, notificationInfo } = state;

  function handleClose(event, reason) {
    if (reason !== "clickaway") {
      dispatch({ type: HIDE_MESSAGE });
    }
  }

  const processQueue = useCallback(() => {
    if (queue.length) {
      shiftNotifications().then(({ data }) => {
        const { shiftNotifications: notificationInfo } = data;
        dispatch({ type: SHOW_MESSAGE, notificationInfo });
        isVisible.current = true;
      });
    } else {
      isVisible.current = false;
    }
  }, [queue.length, shiftNotifications]);

  function handleExited() {
    processQueue();
  }

  useEffect(() => {
    if (queue.length) {
      if (open) {
        dispatch({ type: HIDE_MESSAGE });
      } else if (!isVisible.current) {
        processQueue();
      }
    }
  }, [queue.length, open, processQueue]);

  const message = notificationInfo ? notificationInfo.message : "";

  return (
    <Snackbar
      open={open}
      message={message}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={3000}
      onClose={handleClose}
      onExited={handleExited}
      action={
        <IconButton color="inherit" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      }
    />
  );
}

export default Notifier;
