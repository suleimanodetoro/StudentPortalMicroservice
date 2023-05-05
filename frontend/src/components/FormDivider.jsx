import React from "react";

const FormDivider = ({ children, top }) => {
  return (
    <div className="d-flex flex-md-row flex-column justify-content-between mb-4">
      <div
        style={{ textTransform: "capitalize", minWidth: "200px" }}
        className="mb-2 mb-md-0"
      >
        {top && top}
      </div>
      <div className="w-100">{children}</div>
    </div>
  );
};

export default FormDivider;
