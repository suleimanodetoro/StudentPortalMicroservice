import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useHistory } from "react-router-dom";

const useCreate = ({ fn, invalidateKey }) => {
  const history = useHistory();

  const queryClient = useQueryClient();
  const { isLoading, error, mutateAsync } = useMutation((data) => fn(data), {
    onSuccess: () => {
      if (Array.isArray(invalidateKey)) {
        invalidateKey.forEach((item) => queryClient.invalidateQueries([item]));
      } else {
        queryClient.invalidateQueries([invalidateKey]);
      }

      history.push(`/${invalidateKey}`);
    },
  });
  return { isLoading, error, mutateAsync };
};

export default useCreate;
