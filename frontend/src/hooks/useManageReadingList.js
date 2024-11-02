import { useMutation, useQueryClient } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";
import { useAuthContext } from "./useAuthContext";

// ADD BOOK TO A READING LIST
const addBookToReadingList = async ({ userId, listName, book }) => {
  const response = await backendAxiosConfig.post(`/readinglists/books`, {
    userId,
    listName,
    bookId: book.bookId,
    bookTitle: book.bookTitle,
    bookAuthors: book.bookAuthors,
    bookISBN: book.bookISBN,
    bookCategories: book.bookCategories,
    bookPublisher: book.bookPublisher,
    bookPublishedDate: book.bookPublishedDate,
    bookPageCount: book.bookPageCount,
    bookLanguage: book.bookLanguage,
    bookAverageRating: book.bookAverageRating,
    bookImage: book.bookImage,
  });
  return response.data;
};

// REMOVE BOOK FROM A READING LIST
const removeBookFromReadingList = async ({ bookId }) => {
  const response = await backendAxiosConfig.delete(
    `/readinglists/books/${bookId}`
  );
  return response.data;
};

export const useManageReadingList = () => {
  const queryClient = useQueryClient();
  const { fetchCurrentUser } = useAuthContext();

  const addBookMutation = useMutation({
    mutationFn: addBookToReadingList,
    onSuccess: () => {
      // Invalidate the reading lists query to re-fetch the lists data
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      // Re-fetch the updated user data
      fetchCurrentUser();
    },
  });

  const removeBookMutation = useMutation({
    mutationFn: removeBookFromReadingList,
    onSuccess: () => {
      // Invalidate the reading lists query to re-fetch the lists data
      queryClient.invalidateQueries({ queryKey: ["readingLists"] });
      // Re-fetch the updated user data
      fetchCurrentUser();
    },
  });

  return { addBookMutation, removeBookMutation };
};
