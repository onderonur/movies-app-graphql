import useWidth from "./useWidth";
import { isWidthUp } from "@material-ui/core/withWidth";

function useGridListCols() {
  const width = useWidth();

  function getGridListCols() {
    if (isWidthUp("lg", width)) {
      return 4;
    }

    if (isWidthUp("md", width)) {
      return 3;
    }

    if (isWidthUp("sm", width)) {
      return 2;
    }

    return 1;
  }

  return getGridListCols();
}

export default useGridListCols;
