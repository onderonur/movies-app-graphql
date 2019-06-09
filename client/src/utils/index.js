import { createMuiTheme } from "@material-ui/core";

export function getNonDeletedItems(items) {
  return items.filter(item => !item.__deleted);
}

export function pushToModalRoute(history, pathname) {
  history.push({
    pathname,
    state: {
      modal: true
    }
  });
}

// TODO: material-ui/color'u dene
export function getMuiTheme(darkTheme) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#00796b",
        contrastText: "#fff"
      },
      secondary: {
        main: "#d32f2f",
        contrastText: "#fff"
      },
      type: darkTheme ? "dark" : "light"
    }
  });

  return theme;
}

export function readFromLocalStorage(key) {
  const jsonString = localStorage.getItem(key);
  if (jsonString) {
    const jsonData = JSON.parse(jsonString);
    return jsonData;
  }
  return null;
}

export function storeToLocalStorage(key, data) {
  const jsonString = JSON.stringify(data);
  localStorage.setItem(key, jsonString);
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export function decodeJWT(token) {
  return JSON.parse(decodeURIComponent(escape(atob(token.split(".")[1]))));
}
