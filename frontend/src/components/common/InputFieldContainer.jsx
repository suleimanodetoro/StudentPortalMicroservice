import React from "react";
import FormDivider from "../FormDivider";
import CopyTranslate from "./CopyTranslate";
import InvalidInputAlert from "./InvalidInputAlert";

const InputFieldContainer = ({ children, label, isRequired, error }) => (
  <FormDivider
    top={
      <label>
        <CopyTranslate>{label}</CopyTranslate>
        <font color="red" className="ms-1">
          {isRequired && "*"}
        </font>
      </label>
    }
  >
    {children}
    <InvalidInputAlert error={error} />
  </FormDivider>
);

export default InputFieldContainer;
