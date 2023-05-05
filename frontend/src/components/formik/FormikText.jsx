import { Field, useField } from "formik";
import React from "react";
import { isRequireField } from "../../helper/functions";
import toStandardFormat from "../../helper/toStandardFormat";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikText = ({
  name,
  className = "form-control",
  label = "",
  errors,
  placeholder,
  ...props
}) => {
  // eslint-disable-next-line no-unused-vars
  const [_, meta] = useField(name);

  return (
    <InputFieldContainer
      label={label}
      error={
        meta.touched &&
        meta.error &&
        (meta.error === "REQUIRED." ? isRequireField(label) : meta.error)
      }
      isRequired={!!meta.error}
    >
      <Field
        id={name}
        name={name}
        className={className}
        placeholder={toStandardFormat(
          placeholder ? placeholder : `Enter ${label}`.toLowerCase()
        )}
        {...props}
      />
    </InputFieldContainer>
  );
};

export default FormikText;
