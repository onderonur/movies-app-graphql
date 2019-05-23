// OK
import React from "react";
import { withWidth } from "@material-ui/core";
import { checkIsMobile } from "utils";

/**
 * DetectMobile HOC
 * A HOC is basically a function that returns a React component (class or functional)
 */
export const withDetectMobile = WrappedComponent => {
  return withWidth()(({ width, ...rest }) => {
    const isMobile = checkIsMobile(width);

    // Inject props into the wrapped component. These are usually state values or
    // instance methods.
    // Pass props to wrapped component
    return <WrappedComponent isMobile={isMobile} {...rest} />;
  });
};
