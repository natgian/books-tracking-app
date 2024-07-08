import { stripHTMLtags } from "../../utilities/stripHTMLtags";
import { useState } from "react";

const BookDetails = ({
  title,
  authors,
  categories,
  description,
  isbn,
  publisher,
  publishedDate,
  pageCount,
  language,
}) => {
  const [showText, setShowText] = useState("");
  const cleanedDescription = stripHTMLtags(description);

  return (
    <div className="book-details-container">
      <div className="book-header">
        <h1 className="book-title">{title}</h1>
        <div className="book-author-container">
          {authors &&
            authors.map((author, index) => (
              <span key={index}>
                <a href="#" className="book-author">
                  {author}
                </a>
                {index < authors.length - 1 && ","}
              </span>
            ))}
        </div>
        <div className="book-genre-container">
          {categories &&
            categories.slice(0, 4).map((category, index) => (
              <p key={index} className="book-genre">
                {category}
              </p>
            ))}
        </div>
      </div>

      {description && (
        <p className="book-text">
          {showText
            ? `${cleanedDescription}`
            : `${cleanedDescription.substring(0, 500)}... `}
          <button
            type="button"
            className="show-text-btn"
            onClick={() => setShowText(!showText)}
          >
            {showText ? "weniger anzeigen" : "mehr anzeigen"}
          </button>
        </p>
      )}
      <div className="book-details-table">
        <table>
          <tbody>
            <tr>
              <th>ISBN:</th>
              <td>
                {isbn.find((id) => id.type === "ISBN_13")?.identifier ||
                  "ISBN nicht gefunden"}
              </td>
            </tr>
            <tr>
              <th>Verlag:</th>
              <td>{publisher}</td>
            </tr>
            <tr>
              <th>Erscheinungsdatum:</th>
              <td>{publishedDate}</td>
            </tr>
            <tr>
              <th>Seitenzah:</th>
              <td>{pageCount}</td>
            </tr>
            <tr>
              <th>Sprache:</th>
              <td>{language.toUpperCase()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BookDetails;
