import axios from "axios";
import { toast } from "react-hot-toast";
import axiosApiInstance from "../helper/axiosInstance";

const BookResourceAPi = {
  async fetchBooks() {
    const response = await axiosApiInstance({
      url: "/api/get-books",
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },

  async borrowBook(data) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/save-book",
      data,
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Book borrowed successfully");
    }
    return response.data;
  },
  async returnBook(bookId) {
    const response = await axiosApiInstance({
      method: "post",
      url: "/api/return-book",
      params: { bookId },
    });

    if ([200, 201].includes(response.status)) {
      toast.success("Book borrowed successfully");
    }
    return response.data;
  },

  getBookCover({ key, value, size = "M" }) {
    return `https://covers.openlibrary.org/b/${key}/${value}-${size}.jpg`;
  },
  async searchBooks(q = "") {
    const response = await axios({
      url: "http://openlibrary.org/search.json",
      params: { q },
    });

    if (![200, 201].includes(response.status)) {
      toast.error("Internal server error, Please try again later.");
    }
    return response.data;
  },
};

export const { fetchBooks, borrowBook, getBookCover, searchBooks, returnBook } =
  BookResourceAPi;

export default BookResourceAPi;
