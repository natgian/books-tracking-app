import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/fetchBooks";
import { BiErrorCircle } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import "./Searchresults.css";
import SearchresultCard from "./SearchresultCard";

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
      queryKey: ["books", searchTerm],
      queryFn: () => fetchBooks(searchTerm),
    });

    return queryClient.getQueryData(["books", searchTerm]);
  };

// SEARCHRESULTS //
const Searchresults = () => {
  const initialData = useLoaderData();
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const searchTerm = new URLSearchParams(window.location.search).get("q");

  useEffect(() => {
    if (searchTerm) {
      setLastSearchTerm(searchTerm);
    }
  }, [searchTerm]);

  const {
    data: books = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["books", lastSearchTerm],
    queryFn: () => fetchBooks(lastSearchTerm),
    initialData,
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  });

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
  if (books.length < 1) {
    return (
      <section className="text-center section-container">
        Die Suche ergab leider keine Treffer.
      </section>
    );
  }

  return (
    <section className="section-container searchresults-container">
      {books.map((book) => {
        return <SearchresultCard key={book.id} book={book} />;
      })}
    </section>
  );
};
export default Searchresults;
