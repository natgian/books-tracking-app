import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAuthorBooks } from "../../api/fetchAuthorBooks";
import { BiErrorCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import "./Searchresults.css";
import SearchresultCard from "./SearchresultCard";

// SEARCHRESULTS COMPONENT //
const AuthorSearchresults = () => {
  const { author } = useParams();
  const maxResultsPerPage = 10;

  const {
    data,
    error,
    isError,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["authorBooks", author],
    queryFn: ({ pageParam = 0 }) =>
      fetchAuthorBooks(
        author,
        pageParam * maxResultsPerPage,
        maxResultsPerPage
      ),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === maxResultsPerPage
        ? allPages.length
        : undefined;
    },
    enabled: !!author,
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
        Wird geladen...
      </section>
    );
  }

  // ERROR STATE //
  if (isError) {
    return (
      <section className="text-center section-container">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
        <div className="error">
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
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            className="show-more-btn flex-center"
          >
            {isFetchingNextPage
              ? "Werden geladen..."
              : "Weitere Ergebnisse anzeigen"}
          </button>
        </div>
      )}
    </section>
  );
};
export default AuthorSearchresults;
