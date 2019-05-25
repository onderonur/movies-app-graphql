import React, { useEffect } from "react";
import { Form, connect } from "formik";
import styled from "styled-components";

// TODO: Bak bu olaya bi ara
const DirtyFormHandler = ({ formik }) => {
  useEffect(() => {
    return () => {
      if (formik.dirty) {
        console.log("DIRTY");
      }
    };
  }, [formik.dirty]);

  return null;
};

const FormikDirtyFormHandler = connect(DirtyFormHandler);

// TODO: Mobile modal'da content'i full uzatıp action'ları en alta koymak için bu kısım
// Daha iyi bi yöntem bulunursa o da olabilir
const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
`;

/**
 * noValidate: HTML5 ile gelen validation error mesajlarını kapatmak için.
 * Bu kullanılmadığında, örneğin "TextField"a "required" prop'u verilince,
 * HTML'in kendi error mesajı çıkıyor submit'te.
 */
const BaseForm = ({
  noValidate = true,
  autoComplete = "off",
  children,
  ...formProps
}) => (
  <>
    <FormikDirtyFormHandler />
    <StyledForm
      noValidate={noValidate}
      autoComplete={autoComplete}
      {...formProps}
    >
      {children}
    </StyledForm>
  </>
);

export default BaseForm;
