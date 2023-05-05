import React from "react";
import Th from "./Th";

const Thead = ({ head = [] }) => {
  return (
    <thead>
      <tr>
        {head.map((item) => (
          <Th key={item}>{item}</Th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
