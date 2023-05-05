import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const FinanceResourceAPi = {
  async getInvoices() {
    const response = await axiosApiInstance({
      url: "/api/invoices",
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
  async isGraduate() {
    const response = await axiosApiInstance({
      url: "/api/is-graduate",
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },

  async makePayment(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/payment",
      params: data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Payment done successfully");
    }
    return response.data;
  },

  async searchInvoice(invoiceNo = "") {
    const response = await axiosApiInstance({
      url: "/api/invoicesByUserInvoiceNo",
      params: { invoiceNo },
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
};

export const { getInvoices, isGraduate, makePayment, searchInvoice } =
  FinanceResourceAPi;

export default FinanceResourceAPi;
