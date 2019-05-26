import { useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function useWidth() {
  const theme = useTheme();
  const xl = useMediaQuery(theme.breakpoints.only("xl"));
  const lg = useMediaQuery(theme.breakpoints.only("lg"));
  const md = useMediaQuery(theme.breakpoints.only("md"));
  const sm = useMediaQuery(theme.breakpoints.only("sm"));

  function getWidth() {
    if (xl) {
      return "xl";
    }
    if (lg) {
      return "lg";
    }
    if (md) {
      return "md";
    }
    if (sm) {
      return "sm";
    }

    return "xs";
  }

  return getWidth();
}

export default useWidth;
