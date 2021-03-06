import useWidth from "./useWidth";
import { isWidthUp } from "@material-ui/core/withWidth";

function addHalf(number) {
  return number + 0.5;
}

function useGridListCols({
  direction = "vertical",
  lg = 4,
  md = 3,
  sm = 2,
  xs = 1
} = {}) {
  const width = useWidth();
  const isHorizontal = direction === "horizontal";

  function getGridListCols() {
    if (lg && isWidthUp("lg", width)) {
      return !isHorizontal ? lg : addHalf(lg);
    }

    if (md && isWidthUp("md", width)) {
      return !isHorizontal ? md : addHalf(md);
    }

    if (sm && isWidthUp("sm", width)) {
      return !isHorizontal ? sm : addHalf(sm);
    }

    return !isHorizontal ? xs : addHalf(xs);
  }

  return getGridListCols;
}

export default useGridListCols;
