import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makePayment, searchInvoice } from "../../api/financeResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import FormikForm from "../../components/formik/FormikForm";
import FormikText from "../../components/formik/FormikText";
import YUP from "../../constants/yup";
import { isConfirm, isRequireField } from "../../helper/functions";
import useSearch from "../../hooks/useSearch";

const InvoiceSearchScreen = () => {
  const { search, handleSearch } = useSearch();
  const queryClient = useQueryClient();
  const {
    data = {},
    isLoading,
    error,
  } = useQuery(["invoice-search", search], () => searchInvoice(search), {
    enabled: !!search,
  });

  const {
    isLoading: isPaymentLoading,
    error: isPaymentError,
    mutateAsync: paymentFn,
  } = useMutation((data) => makePayment(data), {
    onSuccess: () => queryClient.invalidateQueries("invoice-search"),
  });
  const { invoiceNo, name, amount, invoiceType, invoiceFor } = data;

  return (
    <>
      {search ? (
        <TableList
          loading={isLoading && search}
          errors={[error || isPaymentError]}
          data={data}
          head={[
            "#",
            "Invoice No.",
            "Type",
            "Name",
            "Amount",
            "Status",
            "Payment",
          ]}
          title="Search Invoice"
          handleSearch={handleSearch}
          searchText="Search by invoice no"
        >
          <TableDescription
            index={0}
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
          >
            <Td>
              <button
                className={`btn ${
                  invoiceType === "PAID" ? "btn-success" : "btn-primary"
                }  btn-sm`}
                disabled={invoiceType === "PAID" || isPaymentLoading}
                onClick={() =>
                  isConfirm({
                    text: "It will make your payment status from PENDING to PAID",
                    callback: () => paymentFn({ invoiceNo, amount }),
                  })
                }
              >
                {invoiceType === "PENDING" ? "Pay Now" : "Paid"}
              </button>
            </Td>
          </TableDescription>
        </TableList>
      ) : (
        <FormikForm
          title="Search Invoice"
          initialValues={{
            invoiceNo: "",
          }}
          validationSchema={YUP.object({
            invoiceNo: YUP.string().required(isRequireField()),
          })}
          formFields={[
            {
              label: "Invoice Number",
              name: "invoiceNo",
              component: FormikText,
            },
          ]}
          onSubmit={({ invoiceNo }) => handleSearch(invoiceNo)}
        />
      )}
    </>
  );
};

export default InvoiceSearchScreen;
