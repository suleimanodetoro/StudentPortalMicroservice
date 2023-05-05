import React from "react";
import { deleteCourse, fetchCourse } from "../../api/courseResourceAPi";
import TableAction from "../../components/common/TableAction";
import TableDescription from "../../components/common/TableDescription";
import TableList from "../../components/common/TableList";
import { USER_ROLE } from "../../constants/APP_INFO";
import ROLES from "../../constants/Roles";
import useListAndDelete from "../../hooks/useListAndDelete";

const CourseListScreen = () => {
  const {
    data,
    isLoading,
    error,
    deleteLoading,
    deleteError,
    removeFn,
    handlePagination,
  } = useListAndDelete({
    deleteFn: deleteCourse,
    key: "course-list",
    fetchFn: ({ queryKey }) => fetchCourse({ ...queryKey[1] }),
    isPaginated: false,
  });

  return (
    <TableList
      loading={isLoading}
      errors={[error, deleteError]}
      data={data}
      head={[
        "#",
        "Name",
        "Price",
        [ROLES.FINANCE].includes(USER_ROLE) && "Action",
      ]}
      title="course List"
      handlePageChanges={handlePagination}
      // handleSearch={handleSearch}
    >
      {data?.map((item, index) => {
        const { name, coursePrice } = item;
        return (
          <TableDescription
            key={index}
            index={index}
            trData={[name, coursePrice]}
          >
            <TableAction
              roles={[ROLES.FINANCE]}
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

export default CourseListScreen;
