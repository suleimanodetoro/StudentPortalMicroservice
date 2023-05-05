import React from "react";
import Td from "./Td";

const TableDescription = ({ index, trData = [], children }) => {
  return (
    <tr>
      <th scope="row" className="text-capitalize">
        {index + 1}
      </th>

      {trData.map((item, index) => (
        <Td key={index + item}>{item}</Td>
      ))}

      {children}
    </tr>
  );
};

export default TableDescription;
