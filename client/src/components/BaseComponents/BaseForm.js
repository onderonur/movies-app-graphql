// OK!!
import React, { useEffect } from "react";
import { Form, connect } from "formik";
import { makeStyles } from "@material-ui/core";

// TODO: Bak bu olaya bi ara
function DirtyFormHandler({ formik }) {
  useEffect(() => {
    return () => {
      if (formik.dirty) {
        console.log("DIRTY");
      }
    };
  }, [formik.dirty]);

  return null;
}

const FormikDirtyFormHandler = connect(DirtyFormHandler);

// TODO: Mobile modal'da content'i full uzatıp action'ları en alta koymak için bu kısım
// Daha iyi bi yöntem bulunursa o da olabilir
const useStyles = makeStyles(theme => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowX: "hidden",
    overflowY: "auto"
  }
}));

function BaseForm({
  // TODO: Bu açıklamayı düzelt araştırıp.
  // noValidate: HTML5 ile gelen validation error mesajlarını kapatmak için.
  // Bu kullanılmadığında, örneğin "TextField"a "required" prop'u verilince,
  // HTML'in kendi error mesajı çıkıyor submit'te.
  noValidate = true,
  autoComplete = "off",
  children,
  ...formProps
}) {
  const classes = useStyles();

  return (
    <>
      <FormikDirtyFormHandler />
      <Form
        className={classes.form}
        noValidate={noValidate}
        autoComplete={autoComplete}
        {...formProps}
      >
        {children}
      </Form>
    </>
  );
}

export default BaseForm;
