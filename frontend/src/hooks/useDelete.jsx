import { SuccessMsg } from "../components/common/reusable/ToasterNotification";
import { isConfirm } from "../helper/functions";
import useAxios from "./useAxios";

const useDelete = ({ endpoint = "", message = "", dispatch = null }) => {
  const deleteData = useAxios();
  const handleDelete = (id) => {
    isConfirm({
      callback: () =>
        deleteData.fetcher({
          options: {
            url: `${endpoint}${id}`,
            method: "delete",
          },
          callback: () => {
            SuccessMsg(message + " deleted successfully");
            if (typeof dispatch === "function") {
              return dispatch();
            }
          },
        }),
    });
  };
  return {
    handleDelete,
    error: deleteData.error,
    loading: deleteData.loading,
  };
};

export default useDelete;
