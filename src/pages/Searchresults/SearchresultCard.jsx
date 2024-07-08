import defaultCover from "../../assets/no-cover.jpg";
import { Link } from "react-router-dom";
import "./Searchresults.css";
import { secureImageURL } from "../../utilities/secureImageURL";

const SearchresultCard = ({ book }) => {
  const imageUrl = book.volumeInfo?.imageLinks?.smallThumbnail;
  return (
    <Link to={`/buch/${book.id}`}>
      <div className="searchresult-wrapper">
        <div className="searchresult-cover-wrapper">
          <img
            src={imageUrl ? secureImageURL(imageUrl) : defaultCover}
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
    </Link>
  );
};
export default SearchresultCard;
