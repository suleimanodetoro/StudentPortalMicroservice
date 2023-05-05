import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useSearch from "./useSearch";

const useListAndDelete = ({ fetchFn, deleteFn, key, isPaginated }) => {
  const [page, setPage] = useState(0);
  const { search, handleSearch } = useSearch();

  const QueryKeysArray = [key, isPaginated && { page, name: search }].filter(
    Boolean
  );

  const handlePagination = ({ selected }) => setPage(selected);

  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery(QueryKeysArray, fetchFn);

  const {
    isLoading: deleteLoading,
    error: deleteError,
    mutateAsync: removeFn,
  } = useMutation((data) => deleteFn(data), {
    onSuccess: () => queryClient.invalidateQueries(QueryKeysArray),
  });
  return {
    data,
    isLoading,
    error,
    deleteLoading,
    deleteError,
    removeFn,
    refetch,
    handlePagination,
    handleSearch,
  };
};

export default useListAndDelete;
