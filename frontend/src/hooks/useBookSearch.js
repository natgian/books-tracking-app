import { useInfiniteQuery } from "@tanstack/react-query";

const MAX_SEARCH_RESULTS = 12;

export const useBookSearch = (queryKey, queryFn, enabled) => {
  /**
   * Fetches paginated book results for the current search term.
   * Each page loads MAX_SEARCH_RESULTS books starting from the calculated offset.
   * The query is disabled until a search term is present.
   */
  const { data, error, isError, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 0 }) => queryFn(pageParam * MAX_SEARCH_RESULTS, MAX_SEARCH_RESULTS),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
    },
    enabled,
  });

  /**
   * Merges all loaded pages into a single flat list of books.
   * data.pages = [[book1, book2], [book3, book4]] --> [book1, book2, book3, book4]
   */
  const books = data?.pages.flat() || [];

  /**
   * Removes duplicate books by ID.
   * Keeps only the first occurence of each book.
   * Necessary because the Google Books API can reteurn the same book on multiple pages.
   */
  const uniqueBooks = books.filter((book, index, self) => index === self.findIndex((b) => b.id === book.id));

  return { uniqueBooks, error, isError, isPending, fetchNextPage, hasNextPage, isFetchingNextPage };
};
