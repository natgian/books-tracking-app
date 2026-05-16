import { fetchBooks } from "../../api/fetchBooks";
import { BiErrorCircle } from "react-icons/bi";
import { useSearchParams } from "react-router-dom";
import "./Searchresults.css";
import SearchresultCard from "./SearchresultCard";
import { Loading } from "../../components";
import { useBookSearch } from "../../hooks/useBookSearch";

const Searchresults = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q");

  const { uniqueBooks, error, isError, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useBookSearch(
    ["books", searchTerm],
    (startIndex, maxResults) => fetchBooks(searchTerm, startIndex, maxResults),
    !!searchTerm,
  );

  /**
   * LOADING STATE
   */
  if (isPending) {
    return (
      <section className="text-center section-container">
        <Loading />
        Wird geladen...
      </section>
    );
  }

  /**
   * ERROR STATE
   */
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

  /**
   * NO SEARCH RESULTS
   */
  if (uniqueBooks.length < 1) {
    return <section className="text-center section-container">Die Suche ergab leider keine Treffer.</section>;
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
          <button type="button" onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage} className="show-more-btn flex-center">
            {isFetchingNextPage ? <Loading /> : "Weitere Ergebnisse anzeigen"}
          </button>
        </div>
      )}
    </section>
  );
};
export default Searchresults;
