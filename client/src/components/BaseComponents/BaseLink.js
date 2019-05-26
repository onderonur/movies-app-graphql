import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { ModalLink } from "react-router-modal-gallery";

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
const AdapterLink = React.forwardRef((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

const AdapterModalLink = React.forwardRef((props, ref) => (
  <ModalLink innerRef={ref} {...props} />
));

const BaseLink = React.forwardRef((props, ref) => {
  const { toModal, ...rest } = props;

  return (
    <Link
      innerRef={ref}
      {...rest}
      component={toModal ? AdapterModalLink : AdapterLink}
    />
  );
});

export default BaseLink;
