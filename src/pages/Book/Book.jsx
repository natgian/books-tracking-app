import "./Book.css";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiErrorCircle } from "react-icons/bi";
import { useState } from "react";
import { fetchSingleBook } from "../../api/fetchSingleBook";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { secureImageURL } from "../../utilities/secureImageURL";
import { stripHTMLtags } from "../../utilities/stripHTMLtags";
import { getBestImage } from "../../utilities/getBestImage";

// LOADER //
export const singleBookLoader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.prefetchQuery({
      queryKey: ["book", id],
      queryFn: () => fetchSingleBook(id),
    });

    return queryClient.getQueryData(["book", id]);
  };

// BOOK //
const Book = () => {
  const initialData = useLoaderData();
  const { id } = initialData;
  const {
    data: book,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchSingleBook(id),
    initialData,
  });

  const imageURL = getBestImage(book.volumeInfo.imageLinks);

  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getBackgroundClass = () => {
    if (selectedOption === "want to read") {
      return "tbr";
    }
    if (selectedOption === "read") {
      return "read";
    }
    if (selectedOption === "reading") {
      return "reading";
    }
  };

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

  return (
    <section className="book-details section-container">
      <div className="book-cover-container">
        {/* COVER */}
        <img
          src={secureImageURL(imageURL)}
          alt={book.volumeInfo.title}
          className="book-cover"
        />
        {/* READING LIST */}
        <Tippy content="Leseliste bearbeiten">
          <div className="custom-select">
            <BiSolidDownArrow className="select-arrow" />
            <select
              className={`btn-select ${getBackgroundClass()}`}
              aria-label="Leseliste bearbeiten"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Leseliste
              </option>
              <option value="want to read">will ich lesen</option>
              <option value="read">gelesen</option>
              <option value="reading">am Lesen</option>
              <option value="">aus Listen entfernen</option>
            </select>
          </div>
        </Tippy>
      </div>

      {/* BOOK DETAILS */}
      <div className="book-details-container">
        <div className="book-header">
          <h1 className="book-title">{book.volumeInfo.title}</h1>
          <div className="book-author-container">
            {book.volumeInfo.authors &&
              book.volumeInfo.authors.map((author, index) => (
                <span key={index}>
                  <a href="#" className="book-author">
                    {author}
                  </a>
                  {index < book.volumeInfo.authors.length - 1 && ","}
                </span>
              ))}
          </div>
          <div className="book-genre-container">
            {book.volumeInfo.categories &&
              book.volumeInfo.categories.slice(0, 4).map((category, index) => (
                <p key={index} className="book-genre">
                  {category}
                </p>
              ))}
          </div>
        </div>

        {book.volumeInfo.description && (
          <p className="book-text">
            {stripHTMLtags(book.volumeInfo.description)}
          </p>
        )}
        <div className="book-details-table">
          <table>
            <tbody>
              <tr>
                <th>ISBN:</th>
                <td>
                  {book.volumeInfo.industryIdentifiers.find(
                    (id) => id.type === "ISBN_13"
                  )?.identifier || "ISBN nicht gefunden"}
                </td>
              </tr>
              <tr>
                <th>Verlag:</th>
                <td>{book.volumeInfo.publisher}</td>
              </tr>
              <tr>
                <th>Erscheinungsdatum:</th>
                <td>{book.volumeInfo.publishedDate}</td>
              </tr>
              <tr>
                <th>Seitenzah:</th>
                <td>{book.volumeInfo.pageCount}</td>
              </tr>
              <tr>
                <th>Sprache:</th>
                <td>{book.volumeInfo.language.toUpperCase()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Book;
