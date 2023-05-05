import { Field, useField } from "formik";
import React from "react";
import { fileToByteArray, isRequireField } from "../../helper/functions";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikFileByte = ({
  name,
  className = "form-control",
  label,
  ...props
}) => {
  // eslint-disable-next-line no-unused-vars
  const [, meta] = useField(name);

  return (
    <InputFieldContainer
      label={label}
      error={
        meta.error &&
        (meta.error === "REQUIRED." ? isRequireField(label) : meta.error)
      }
      isRequired={!!meta.error}
    >
      <Field name={name}>
        {({ form }) => (
          <input
            type="file"
            name={name}
            className={className}
            onChange={(event) => {
              const data = fileToByteArray(event.currentTarget.files[0]);
              data
                .then((file) => {
                  form.setFieldValue(name, file);
                })
                .catch((err) => console.log(err));
            }}
            {...props}
          />
        )}
      </Field>
    </InputFieldContainer>
  );
};
export default FormikFileByte;
