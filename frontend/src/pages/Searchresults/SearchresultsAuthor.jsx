import { fetchAuthorBooks } from "../../api/fetchAuthorBooks";
import { BiErrorCircle } from "react-icons/bi";
import { useParams } from "react-router-dom";
import "./Searchresults.css";
import SearchresultCard from "./SearchresultCard";
import { Loading } from "../../components";
import { useBookSearch } from "../../hooks/useBookSearch";

const SearchresultsAuthor = () => {
  const { author } = useParams();

  const { uniqueBooks, error, isError, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useBookSearch(
    ["authorBooks", author],
    (startIndex, maxResults) => fetchAuthorBooks(author, startIndex, maxResults),
    !!author,
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
            {isFetchingNextPage ? "Werden geladen..." : "Weitere Ergebnisse anzeigen"}
          </button>
        </div>
      )}
    </section>
  );
};
export default SearchresultsAuthor;
