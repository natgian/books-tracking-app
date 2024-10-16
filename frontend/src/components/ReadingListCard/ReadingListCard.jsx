import ProgressBar from "../ProgressBar/ProgressBar";
import StarRating from "../StarRating/StarRating";
import "./ReadingListCard.css";
import { formatDate } from "../../utilities/formatDate";

const ReadingListCard = ({
  showProgressBar = true,
  showReadDate = false,
  readDate = "",
  book,
}) => {
  {
    console.log(book);
  }
  const { addedToListAt, currentPage, userRating } = book;
  const {
    title,
    author,
    imageURL,
    pageCount,
    updatedAt,
    googleAverageRating,
    googleRatingsCount,
  } = book.book;
  return (
    <div className="readinglist-card">
      {/* COVER */}
      <div>
        <img className="readinglist-card-cover" src={imageURL} alt="title" />
      </div>

      <div className="readinglist-card-info-wrapper">
        {/* BOOK INFOS */}

        <h2 className="readinglist-card-title">{title}</h2>
        <h3 className="readinglist-card-author">{author}</h3>
        <StarRating
          averageRating={googleAverageRating}
          showRatingsCount={false}
        />
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
            <p>15.08.2024</p>
          </div>
        )}

        {/* PROGRESS */}
        {showProgressBar && <ProgressBar />}
      </div>
    </div>
  );
};
export default ReadingListCard;
