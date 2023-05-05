import React from "react";
import { fetchBooks, returnBook } from "../../api/bookResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import { formatDateString } from "../../helper/formatedDate";
import { isConfirm } from "../../helper/functions";
import useListAndDelete from "../../hooks/useListAndDelete";

const BookListScreen = () => {
  const { data, isLoading, error, deleteLoading, deleteError, removeFn } =
    useListAndDelete({
      key: "book-list",
      fetchFn: ({ queryKey }) => fetchBooks({ ...queryKey[1] }),
      deleteFn: returnBook,
    });

  return (
    <TableList
      loading={isLoading}
      errors={[error, deleteError]}
      data={data}
      head={[
        "#",
        "Name",
        "Status",
        "Borrowed Date",
        "Return Date",
        "ISBN",
        USER_ROLE === ROLES.STUDENT && "Action",
      ]}
      title="Book List"
      // handleSearch={handleSearch}
    >
      {data?.map((item, index) => {
        const { id, name, bookStatus, borrowedDateTime, returnDateTIme, isbn } =
          item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[
              name,
              bookStatus,
              formatDateString(borrowedDateTime),
              formatDateString(returnDateTIme),
              isbn,
            ]}
          >
            {USER_ROLE === ROLES.STUDENT && (
              <Td>
                <button
                  onClick={() =>
                    isConfirm({
                      text: "It will be returned to the library",
                      callback: () => removeFn(id),
                    })
                  }
                  className="btn btn-sm alert-primary"
                  disabled={bookStatus === "RETURNED" || deleteLoading}
                >
                  {bookStatus !== "RETURNED" ? "Return Book" : bookStatus}
                </button>
              </Td>
            )}
          </TableDescription>
        );
      })}
    </TableList>
  );
};

export default BookListScreen;
