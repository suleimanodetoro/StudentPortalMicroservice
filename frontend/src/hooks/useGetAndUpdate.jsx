import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHistory, useParams } from "react-router-dom";

const useGetAndUpdate = ({ fetchFn, updateFn, key, invalidateKey }) => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const history = useHistory();
  const { data, isLoading, error } = useQuery([key], () => fetchFn(id), {
    enabled: !!id,
  });

  const {
    isLoading: updateLoading,
    error: updateError,
    mutateAsync: patcher,
  } = useMutation((data) => updateFn({ data, id }), {
    onSuccess: () => {
      if (Array.isArray(invalidateKey)) {
        invalidateKey.map((item) => queryClient.invalidateQueries([item]));
        history.push(`/${invalidateKey[0]}`);
      } else {
        queryClient.invalidateQueries([invalidateKey]);
        history.push(`/${invalidateKey}`);
      }
    },
  });
  return { id, data, isLoading, error, updateLoading, updateError, patcher };
};

export default useGetAndUpdate;
