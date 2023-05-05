import React from "react";
import { allUsers, deleteUser } from "../../api/userAPIs";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import formatDate from "../../helper/formatedDate";
import useListAndDelete from "../../hooks/useListAndDelete";

const UserListScreen = () => {
  const {
    data,
    isLoading,
    error,
    deleteLoading,
    deleteError,
    removeFn,
    handlePagination,
    handleSearch,
  } = useListAndDelete({
    fetchFn: ({ queryKey }) => allUsers({ ...queryKey[1] }),
    deleteFn: deleteUser,
    key: "user-list",
    isPaginated: true,
  });

  return (
    <TableList
      loading={isLoading}
      errors={[error, deleteError]}
      data={data}
      head={[
        "#",
        "Name",
        "Email",
        "address",
        "title",
        "DOB",
        "hiring",
        "Action",
      ]}
      title="User List"
      handlePageChanges={handlePagination}
      isPaginated
      handleSearch={handleSearch}
      searchText="Search by email"
    >
      {data?.content?.map((item, index) => {
        const {
          firstName,
          lastName,
          email,
          address,
          title,
          birthDate,
          hireDate,
        } = item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[
              `${firstName} ${lastName}`,
              email,
              address,
              title,
              formatDate(birthDate),
              formatDate(hireDate),
            ]}
          >
            <TableAction
              removeFn={removeFn}
              deleteLoading={deleteLoading}
              id={item?.id}
            />
          </TableDescription>
        );
      })}
    </TableList>
  );
};

export default UserListScreen;
