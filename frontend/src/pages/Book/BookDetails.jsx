import { stripHTMLtags } from "../../utilities/stripHTMLtags";
import { languageMap } from "../../utilities/languageMap";
import { useState } from "react";
import { Link } from "react-router-dom";

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
  const mapedLanguage = languageMap[language] || "-";

  return (
    <div className="book-details-container">
      <div className="book-header">
        <h1 className="book-title">{title}</h1>
        <div className="book-author-container">
          {authors &&
            authors.map((author, index) => (
              <span key={index} className="book-author">
                <Link
                  to={`/suchresultate/autor/${author}`}
                  className="book-author"
                >
                  {author}
                </Link>
                {index < authors.length - 1 && ", "}
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
            className="show-more-btn"
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
                {(isbn &&
                  isbn.find((id) => id.type === "ISBN_13")?.identifier) ||
                  "-"}
              </td>
            </tr>
            <tr>
              <th>Verlag:</th>
              <td>{publisher || "-"}</td>
            </tr>
            <tr>
              <th>Erscheinungsdatum:</th>
              <td>{publishedDate || "-"}</td>
            </tr>
            <tr>
              <th>Seitenzahl:</th>
              <td>{pageCount || "-"}</td>
            </tr>
            <tr>
              <th>Sprache:</th>
              <td>{mapedLanguage}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default BookDetails;
