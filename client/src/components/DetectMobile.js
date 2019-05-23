// OK
import { withWidth } from "@material-ui/core";
import { checkIsMobile } from "utils";

/**
 * DetectMobile component with render props pattern
 */
const DetectMobile = ({ width, children }) => {
  let isMobile = checkIsMobile(width);

  return children({ isMobile });
};

export default withWidth()(DetectMobile);
