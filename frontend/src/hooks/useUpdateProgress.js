import { useMutation, useQueryClient } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";
import { useAuthContext } from "./useAuthContext";

// UPDATE THE READING PROGRSS
const updateReadingProgress = async ({
  userId,
  bookEntryId,
  currentPage,
  bookId,
}) => {
  const response = await backendAxiosConfig.put(`/readinglists/books`, {
    userId,
    bookEntryId,
    currentPage,
    bookId,
  });
  return response.data;
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();
  const { fetchCurrentUser } = useAuthContext();

  const updateProgressMutation = useMutation({
    mutationFn: updateReadingProgress,
    onSuccess: () => {
      // Invalidate the reading lists query to re-fetch the lists data
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      // Optionally, refetch user data if needed
      fetchCurrentUser();
    },
    onError: (error) => {
      console.error("Error updating progress:", error);
    },
  });

  return { updateProgressMutation };
};
