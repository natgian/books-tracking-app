import backendAxiosConfig from "../api/backendAxiosConfig";
import { useAuthContext } from "./useAuthContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// UPDATE THE READING PROGRSS
const finishedBook = async ({ userId, bookEntryId }) => {
  const response = await backendAxiosConfig.put(
    `/readinglists/books/finished`,
    { userId, bookEntryId }
  );
  return response.data;
};

export const useFinishedBook = () => {
  const queryClient = useQueryClient();
  const { fetchCurrentUser } = useAuthContext();

  const finishedBookMutation = useMutation({
    mutationFn: finishedBook,
    onSuccess: () => {
      //Invalidate the reading lists query to re-fetch the lists data
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      // Optionally, refetch user data if needed
      fetchCurrentUser();
    },
    onError: (error) => {
      console.error("Error updating finished book:", error);
    },
  });

  return { finishedBookMutation };
};
