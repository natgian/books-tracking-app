import { useMutation, useQueryClient } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";
import { useAuthContext } from "./useAuthContext";

// UPDATE THE ADDED/FINISHED BOOK DATE
const updateDate = async ({
  userId,
  bookEntryId,
  listType,
  dateType,
  newDate,
}) => {
  const response = await backendAxiosConfig.put(`/readinglists/books/date`, {
    userId,
    bookEntryId,
    listType,
    dateType,
    newDate,
  });
  return response.data;
};

export const useUpdateDate = () => {
  const queryClient = useQueryClient();
  const { fetchCurrentUser } = useAuthContext();

  const updateDateMutation = useMutation({
    mutationFn: updateDate,
    onSuccess: () => {
      // Invalidate the reading lists query to re-fetch the lists data
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      // Optionally, refetch user data if needed
      fetchCurrentUser();
    },
    onError: (error) => {
      console.error("Error updating date:", error);
    },
  });

  return { updateDateMutation };
};
