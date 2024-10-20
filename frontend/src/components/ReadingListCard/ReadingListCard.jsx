import { Link } from "react-router-dom";
import ProgressBar from "../ProgressBar/ProgressBar";
import StarRating from "../StarRating/StarRating";
import "./ReadingListCard.css";
import { formatDate } from "../../utilities/formatDate";
import SelectedReadingOption from "../Buttons/SelectedReadingOption";
import { secureImageURL } from "../../utilities/secureImageURL";

const ReadingListCard = ({
  showProgressBar = true,
  showReadDate = false,
  isReading = false,
  book,
}) => {
  const { addedToListAt, finishedReadingAt, currentPage, userRating } = book;
  const {
    title,
    author,
    imageURL,
    googleBookId,
    pageCount,
    updatedAt,
    googleAverageRating,
    googleRatingsCount,
  } = book.book;
  return (
    <div className="readinglist-card">
      {/* COVER */}
      <div>
        <Link to={`/buch/${googleBookId}`}>
          <img className="readinglist-card-cover" src={imageURL} alt="title" />
        </Link>
      </div>

      <div className="readinglist-card-container">
        {/* BOOK INFOS */}
        <div className="readinglist-card-info-wrapper">
          <Link to={`/buch/${googleBookId}`}>
            <h2 className="readinglist-card-title">{title}</h2>
          </Link>
          <h3 className="readinglist-card-author mt-05">{author}</h3>
          <StarRating
            averageRating={googleAverageRating}
            showRatingsCount={false}
          />
          {isReading && (
            <SelectedReadingOption
              bookId={googleBookId}
              bookTitle={title}
              bookAuthors={author}
              bookPageCount={pageCount}
              bookAverageRating={googleAverageRating}
              bookImage={secureImageURL(imageURL)}
            />
          )}
        </div>
        {/* DATES & PROGESS */}
        <div className="readinglist-card-progress-wrapper">
          {/* DATE ADDED */}
          <div className="readinglist-card-date">
            <span>Hinzugefügt am:</span>
            <p>{formatDate(addedToListAt)}</p>
          </div>
          {/* DATE READ */}
          {showReadDate && (
            <div className="readinglist-card-date">
              <span>Zu Ende gelesen am:</span>
              <p>{finishedReadingAt}</p>
            </div>
          )}

          {/* PROGRESS */}
          {showProgressBar && (
            <ProgressBar
              currentPage={currentPage}
              pageCount={pageCount}
              updatedAt={updatedAt}
            />
          )}

          {/* SELECT READING LIST */}
          {!isReading && (
            <SelectedReadingOption
              bookId={googleBookId}
              bookTitle={title}
              bookAuthors={author}
              bookPageCount={pageCount}
              bookAverageRating={googleAverageRating}
              bookImage={secureImageURL(imageURL)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default ReadingListCard;
