import React from "react";
import { Form } from "formik";

// TODO: Modal kapanırken veya route'dan çıkarken "discard changes" confirm'i ekle

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
  return (
    <>
      <Form noValidate={noValidate} autoComplete={autoComplete} {...formProps}>
        {children}
      </Form>
    </>
  );
}

export default BaseForm;
