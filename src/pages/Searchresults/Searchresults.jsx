import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "../../api/books";
import defaultCover from "../../assets/no-cover.jpg";
import { BiErrorCircle } from "react-icons/bi";
import { useLoaderData } from "react-router-dom";
import "./Searchresults.css";

export const searchresultsLoader =
  (queryClient) =>
  async ({ request }) => {
    const url = new URL(request.url);
    const searchTerm = url.searchParams.get("q");

    if (!searchTerm) {
      return [];
    }

    await queryClient.prefetchQuery({
      queryKey: ["books", searchTerm],
      queryFn: () => fetchBooks(searchTerm),
    });

    return queryClient.getQueryData(["books", searchTerm]);
  };

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

  if (isPending) {
    return (
      <section className="text-center section-container">
        Wird geladen...
      </section>
    );
  }

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
        return (
          <a href="#" key={book.id}>
            <div className="searchresult-wrapper">
              <div className="searchresult-cover-wrapper">
                <img
                  src={
                    book.volumeInfo?.imageLinks?.smallThumbnail || defaultCover
                  }
                  alt={book.volumeInfo.title}
                />
              </div>
              <div className="searchresult-details-wrapper">
                <p className="searchresult-title">{book.volumeInfo.title}</p>
                <p className="searchresult-author">
                  {book.volumeInfo.authors &&
                    (book.volumeInfo.authors.length > 1
                      ? book.volumeInfo.authors.join(", ")
                      : book.volumeInfo.authors)}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </section>
  );
};
export default Searchresults;
