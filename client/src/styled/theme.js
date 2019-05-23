// OK
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00796B",
      contrastText: "#fff"
    },
    secondary: {
      main: "#d32f2f",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

export default theme;
