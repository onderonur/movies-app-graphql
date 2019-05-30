// TODO: React-router-dom'da şu forwardRef olayına bi bak. Gerekiyosa modal-gallery'de ekle vs
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import { ModalLink } from "react-router-modal-gallery";

export { RouterLink };

// required for react-router-dom < 6.0.0
// see https://github.com/ReactTraining/react-router/issues/6056#issuecomment-435524678
// export const AdapterLink = React.forwardRef((props, ref) => (
//   <RouterLink innerRef={ref} {...props} />
// ));

export const AdapterModalLink = React.forwardRef((props, ref) => (
  <ModalLink innerRef={ref} {...props} />
));

const BaseLink = React.forwardRef((props, ref) => {
  const { toModal, ...rest } = props;

  return (
    <Link
      innerRef={ref}
      {...rest}
      component={toModal ? AdapterModalLink : RouterLink}
    />
  );
});

export default BaseLink;
