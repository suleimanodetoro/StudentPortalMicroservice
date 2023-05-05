import { useField } from "formik";
import React from "react";
import ReactSelect from "react-select";
import { isRequireField } from "../../helper/functions";
import InputFieldContainer from "../common/InputFieldContainer";

const FormikMultiSelect = ({
  name,
  options,
  className = "form-control form-select shadow-sm",
  placeholder = "",
  label,
  ...rest
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedOptions) => {
    helpers.setValue(selectedOptions.map((option) => option.value));
  };

  const getValue = () => {
    if (options) {
      return options.filter((option) => field.value.includes(option.value));
    } else {
      return [];
    }
  };

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
      <ReactSelect
        {...rest}
        isMulti
        styles={{
          option: (provided, state) => ({
            ...provided,
            color: state.isSelected ? "red" : "black",
          }),
        }}
        name={name}
        options={options}
        classNamePrefix="select"
        value={getValue()}
        onChange={handleChange}
        onBlur={() => helpers.setTouched(true)}
      />
    </InputFieldContainer>
  );
};
export default FormikMultiSelect;
