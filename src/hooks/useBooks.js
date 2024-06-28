import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../api/books";

export const useBooks = (searchTerm) => {
  return useQuery({
    queryKey: ["books", searchTerm],
    queryFn: () => fetchBooks(searchTerm),
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  });
};
