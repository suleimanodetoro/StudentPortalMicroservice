import React from "react";
import CopyTranslate from "./CopyTranslate";

const Th = ({ children }) => {
  return (
    <th scope="col" className="text-capitalize">
      <CopyTranslate className="text-capitalize">{children}</CopyTranslate>
    </th>
  );
};

export default Th;
