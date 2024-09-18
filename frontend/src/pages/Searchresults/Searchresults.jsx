import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/fetchBooks";
import { BiErrorCircle } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import "./Searchresults.css";
import SearchresultCard from "./SearchresultCard";
import { Loading } from "../../components";

// LOADER //
export const loader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url); // creating a new URL object from request.url
    const searchTerm = url.searchParams.get("q"); // extracts the searchTerm parameter ("q") from the URL query string

    if (!searchTerm) {
      return [];
    }

    await queryClient.prefetchQuery({
      queryKey: ["books", searchTerm, 0],
      queryFn: () => fetchBooks(searchTerm, 0),
    });

    return queryClient.getQueryData(["books", searchTerm, 0]);
  };

// SEARCHRESULTS COMPONENT //
const Searchresults = () => {
  const initialData = useLoaderData();
  const searchTerm = new URLSearchParams(window.location.search).get("q");
  const maxResultsPerPage = 12;

  const {
    data,
    error,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["books", searchTerm],
    queryFn: ({ pageParam = 0 }) =>
      fetchBooks(searchTerm, pageParam * maxResultsPerPage, maxResultsPerPage),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length > 0 ? allPages.length : undefined;
    },
    initialData: {
      pages: [initialData],
      pageParams: [0],
    },
    enabled: !!searchTerm,
  });

  // Flatten the pages to get the list of books
  const books = data?.pages.flat() || [];

  // Check for duplicates and create a new array without duplicates
  const uniqueBooks = books.filter(
    (book, index, self) => index === self.findIndex((b) => b.id === book.id)
  );

  // LOADING STATE //
  if (isPending) {
    return (
      <section className="text-center section-container">
        <Loading />
        Wird geladen...
      </section>
    );
  }

  // ERROR STATE //
  if (isError) {
    return (
      <section className="text-center section-container">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
        <div className="error-box">
          <BiErrorCircle />
          {error.message}
        </div>
      </section>
    );
  }

  // NO SEARCH RESULTS //
  if (uniqueBooks.length < 1) {
    return (
      <section className="text-center section-container">
        Die Suche ergab leider keine Treffer.
      </section>
    );
  }

  return (
    <section className="section-container">
      <div className="searchresults-container">
        {uniqueBooks.map((book) => {
          return <SearchresultCard key={book.id} book={book} />;
        })}
      </div>
      {hasNextPage && (
        <div className="flex-center mt-2 mb-4">
          <button
            type="button"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="show-more-btn flex-center"
          >
            {isFetchingNextPage ? <Loading /> : "Weitere Ergebnisse anzeigen"}
          </button>
        </div>
      )}
    </section>
  );
};
export default Searchresults;
