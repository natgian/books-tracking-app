import { useState } from "react";
import { Link } from "react-router-dom";
import "./ReadingListCard.css";
import { formatDate } from "../../utilities/formatDate";
import { secureImageURL } from "../../utilities/secureImageURL";
import {
  UpdateProgressModal,
  ProgressBar,
  StarRating,
  SelectedReadingOption,
} from "../../components";

const ReadingListCard = ({
  showProgressBar = true,
  showReadDate = false,
  isReading = false,
  book,
}) => {
  const { addedToListAt, finishedReadingAt, currentPage, userRating } = book;
  const {
    _id,
    title,
    author,
    imageURL,
    googleBookId,
    pageCount,
    updatedAt,
    googleAverageRating,
    googleRatingsCount,
  } = book.book;

  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          <Link to={`/buch/${googleBookId}`} className="no-text-decoration">
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
              openModal={openModal}
            />
          )}
        </div>

        {/* DATES & PROGESS */}
        <div className="readinglist-card-progress-wrapper">
          {/* Date added */}
          <div className="readinglist-card-date">
            <span>Hinzugefügt am:</span>
            <p>{formatDate(addedToListAt)}</p>
          </div>
          {/* Date read */}
          {showReadDate && (
            <div className="readinglist-card-date">
              <span>Zu Ende gelesen am:</span>
              <p>{finishedReadingAt}</p>
            </div>
          )}
          {/* Progress */}
          {showProgressBar && (
            <ProgressBar
              currentPage={currentPage}
              pageCount={pageCount}
              updatedAt={updatedAt}
              openModal={openModal}
            />
          )}
          {/* Select Reading List */}
          {!isReading && (
            <SelectedReadingOption
              bookId={googleBookId}
              bookTitle={title}
              bookAuthors={author}
              bookPageCount={pageCount}
              bookAverageRating={googleAverageRating}
              bookImage={secureImageURL(imageURL)}
              openModal={openModal}
            />
          )}
        </div>
      </div>
      {/* Modal to update current page */}
      <UpdateProgressModal
        bookPageCount={pageCount}
        currentPage={currentPage}
        bookId={_id}
        bookEntryId={book._id}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
export default ReadingListCard;
