import React from "react";
import LoadingFailedMessage from "./LoadingFailedMessage";
import Thead from "./Thead";

const Table = ({ children, head = [], loading, data = [] }) => {
  return (
    <div className="table-responsive">
      <table className="table text-center">
        <Thead head={head} />

        <tbody>{children}</tbody>
      </table>
      <LoadingFailedMessage data={data || []} loading={loading} />
    </div>
  );
};

export default Table;
