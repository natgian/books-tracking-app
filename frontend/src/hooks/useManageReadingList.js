import { useMutation, useQueryClient } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";
import { useAuthContext } from "./useAuthContext";

// ADD BOOK TO A READING LIST
const addBookToReadingList = async ({ userId, listName, book }) => {
  const response = await backendAxiosConfig.post(
    `/readinglists/${userId}/books`,
    {
      userId,
      listName,
      bookId: book.bookId,
      bookTitle: book.bookTitle,
      bookAuthors: book.bookAuthors,
      bookPageCount: book.bookPageCount,
      bookAverageRating: book.bookAverageRating,
      bookImage: book.bookImage,
    }
  );
  return response.data;
};

// REMOVE BOOK FROM A READING LIST
const removeBookFromReadingList = async ({ userId, bookId }) => {
  const response = await backendAxiosConfig.delete(
    `/readinglists/${userId}/books/${bookId}`
  );
  return response.data;
};

export const useManageReadingList = () => {
  const queryClient = useQueryClient();
  const { fetchCurrentUser } = useAuthContext();

  const addBookMutation = useMutation({
    mutationFn: addBookToReadingList,
    onSuccess: () => {
      // Invalidate the reading lists query to refresh the data
      queryClient.invalidateQueries(["readingLists"]);
      // Re-fetch the updated user data
      fetchCurrentUser();
    },
  });

  const removeBookMutation = useMutation({
    mutationFn: removeBookFromReadingList,
    onSuccess: () => {
      // Invalidate the reading lists query to refresh the data
      queryClient.invalidateQueries(["readingLists"]);
      // Re-fetch the updated user data
      fetchCurrentUser();
    },
  });

  return { addBookMutation, removeBookMutation };
};
