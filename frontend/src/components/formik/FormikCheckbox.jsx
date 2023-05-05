import { useField } from "formik";
import React from "react";
import { isRequireField } from "../../helper/functions";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikCheckbox = ({ name, label = "", errors, placeholder }) => {
  // eslint-disable-next-line no-unused-vars
  const [field, meta] = useField(name);

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
      <input type="checkbox" id={name} {...field} checked={field.value} />
    </InputFieldContainer>
  );
};

export default FormikCheckbox;
