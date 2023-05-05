import { Field, useField } from "formik";
import React from "react";
import { isRequireField } from "../../helper/functions";
import toStandardFormat from "../../helper/toStandardFormat";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikSelect = ({
  name,
  options,
  className = "form-control form-select shadow-sm",
  placeholder = "",
  label,
  errors,
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
      <Field as="select" id={name} name={name} {...props} className={className}>
        <option value="" disabled>
          {toStandardFormat(placeholder ? placeholder : "Select an option")}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    </InputFieldContainer>
  );
};

export default FormikSelect;
