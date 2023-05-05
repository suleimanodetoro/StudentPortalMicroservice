import React from "react";
import { getInvoices } from "../../api/financeResourceAPi";
import { deleteCourse } from "../../api/courseResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import useListAndDelete from "../../hooks/useListAndDelete";

const InvoiceListScreen = () => {
  const {
    data,
    isLoading,
    error,

    handlePagination,
  } = useListAndDelete({
    deleteFn: deleteCourse,
    key: "invoice-list",
    fetchFn: ({ queryKey }) => getInvoices({ ...queryKey[1] }),
    isPaginated: false,
  });

  return (
    <TableList
      loading={isLoading}
      errors={[error]}
      data={data}
      head={["#", "Invoice No.", "Type", "Name", "Amount", "Status"]}
      title="invoice List"
      handlePageChanges={handlePagination}
      // handleSearch={handleSearch}
    >
      {data?.map((item, index) => {
        const { invoiceNo, name, amount, invoiceType, invoiceFor } = item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[
              invoiceNo,
              invoiceFor,
              name,
              amount,
              <span
                className={`badge alert-${
                  invoiceType === "PENDING" ? "warning" : "success"
                }`}
              >
                {invoiceType}
              </span>,
            ]}
          />
        );
      })}
    </TableList>
  );
};

export default InvoiceListScreen;
