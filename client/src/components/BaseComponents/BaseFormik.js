// OK
import React from "react";
import { Formik } from "formik";

const BaseFormik = ({
  enableReinitialize = true,
  validateOnBlur = false,
  validateOnChange,
  initialValues,
  validationSchema,
  onSubmit,
  onReset,
  render,
  children
}) => (
  <Formik
    // enableReinitialize: Fetch bittikten sonraki initialValue değerinin
    // form'a verilebilmesi için (async).
    enableReinitialize={enableReinitialize}
    initialValues={initialValues}
    validationSchema={validationSchema}
    validateOnBlur={validateOnBlur}
    validateOnChange={validateOnChange}
    onSubmit={onSubmit}
    onReset={onReset}
    render={render}
  >
    {children}
  </Formik>
);

export default BaseFormik;
