import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const useReadingLists = ({ currentList, user }) => {
  const [allBooks, setAllBooks] = useState([]);

  const fetchBooks = async ({ pageParam = 1 }) => {
    const booksList = user?.readingLists[currentList] || [];
    const ITEMS_PER_PAGE = 5;
    const startIndex = (pageParam - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    const paginatedList = booksList.slice(startIndex, endIndex);
    return {
      items: paginatedList,
      nextPage:
        paginatedList.length < ITEMS_PER_PAGE ? undefined : pageParam + 1,
    };
  };

  const {
    data,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["readingLists", currentList],
    queryFn: fetchBooks,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  useEffect(() => {
    if (data) {
      const mergedBooks = data.pages.flatMap((page) => page.items);
      setAllBooks(mergedBooks);
    }
  }, [data]);

  return {
    allBooks,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  };
};
