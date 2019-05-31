import useWidth from "./useWidth";
import { isWidthUp } from "@material-ui/core/withWidth";

function useGridListCols({ direction }) {
  const width = useWidth();
  const isHorizontal = direction === "horizontal";

  function getGridListCols() {
    if (isWidthUp("lg", width)) {
      return !isHorizontal ? 4 : 4.5;
    }

    if (isWidthUp("md", width)) {
      return !isHorizontal ? 3 : 3.5;
    }

    if (isWidthUp("sm", width)) {
      return !isHorizontal ? 2 : 2.5;
    }

    return !isHorizontal ? 1 : 1.5;
  }

  return getGridListCols();
}

export default useGridListCols;
