import { createMuiTheme, colors } from "@material-ui/core";

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

export function getMuiTheme(darkTheme) {
  const theme = createMuiTheme({
    palette: {
      primary: {
        // TODO: Bu dark tema için tonlamanın değişmesinin başka yolu var mı bi bak
        main: colors.teal[darkTheme ? 400 : 500],
        contrastText: colors.common.white
      },
      secondary: {
        main: colors.red[darkTheme ? 400 : 500],
        contrastText: colors.common.white
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
