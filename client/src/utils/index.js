import { isWidthUp } from "@material-ui/core/withWidth";

export const checkIsMobile = width => {
  if (isWidthUp("md", width, true)) {
    return false;
  }

  return true;
};
