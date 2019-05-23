export const checkIsMobile = width => {
  switch (width) {
    case "sm":
    case "xs":
      return true;
    default:
      return false;
  }
};
