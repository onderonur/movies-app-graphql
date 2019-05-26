// TODO: material-ui/color'u dene
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00796b",
      contrastText: "#fff"
    },
    secondary: {
      main: "#d32f2f",
      contrastText: "#fff"
    }
  }
});

export default theme;
