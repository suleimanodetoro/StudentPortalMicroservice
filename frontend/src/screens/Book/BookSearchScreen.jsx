import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";
import {
  borrowBook,
  getBookCover,
  searchBooks,
} from "../../api/bookResourceAPi";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import Td from "../../components/common/Td";
import FormikForm from "../../components/formik/FormikForm";
import FormikText from "../../components/formik/FormikText";
import YUP from "../../constants/yup";
import { isConfirm, isRequireField } from "../../helper/functions";
import useSearch from "../../hooks/useSearch";

const BookSearchScreen = () => {
  const { search, handleSearch } = useSearch();
  const history = useHistory();
  const queryClient = useQueryClient();
  const {
    data = {},
    isLoading,
    error,
  } = useQuery(["book-search", search], () => searchBooks(search), {
    enabled: !!search,
  });

  const {
    isLoading: isPaymentLoading,
    error: isPaymentError,
    mutateAsync: borrowBookFn,
  } = useMutation((data) => borrowBook(data), {
    onSuccess: () => {
      queryClient.invalidateQueries("book-list");
      history.push("/book-list");
    },
  });

  return (
    <>
      {search ? (
        <>
          <TableList
            loading={isLoading && search}
            errors={[error || isPaymentError]}
            data={data?.docs?.slice(0, 20)}
            head={[
              "#",
              "Title",
              "Author name",
              "Year",
              "ISBN",
              "Cover",
              "Action",
            ]}
            title="Search Books"
            handleSearch={handleSearch}
            searchText="Search by name"
          >
            {data?.docs?.slice(0, 20)?.map((item, index) => {
              const {
                title,
                author_name = [],
                first_publish_year,
                isbn = [],
              } = item;
              return (
                <TableDescription
                  index={index}
                  key={index}
                  trData={[
                    title,
                    author_name?.join(", ") ?? "N/A",
                    first_publish_year,
                    isbn[0],
                  ]}
                >
                  <Td>
                    <img
                      src={getBookCover({ key: "isbn", value: isbn[0] })}
                      alt={title}
                      width="80"
                      style={{
                        width: "80px",
                        height: "120px",
                        objectFit: "cover",
                        background: `url("/defaultImage.png")`,
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      className="border shadow border-3 rounded"
                    />
                  </Td>
                  <Td>
                    <button
                      className={`btn btn-primary  btn-sm`}
                      disabled={isPaymentLoading}
                      onClick={() =>
                        isConfirm({
                          text: "It will added to your book list",
                          callback: () =>
                            borrowBookFn({
                              name: title,
                              isbn: isbn[0],
                            }),
                        })
                      }
                    >
                      Borrow Book
                    </button>
                  </Td>
                </TableDescription>
              );
            })}
          </TableList>
        </>
      ) : (
        <FormikForm
          title="Search Book"
          initialValues={{
            name: "",
          }}
          validationSchema={YUP.object({
            name: YUP.string().required(isRequireField()),
          })}
          formFields={[
            {
              label: "Book Name",
              name: "name",
              component: FormikText,
            },
          ]}
          onSubmit={({ name }) => handleSearch(name)}
        />
      )}
    </>
  );
};

export default BookSearchScreen;
