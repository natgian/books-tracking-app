import { useState } from "react";
import { Link } from "react-router-dom";
import "./ReadingListCard.css";
import { formatDate } from "../../utilities/formatDate";
import { secureImageURL } from "../../utilities/secureImageURL";
import {
  UpdateProgressModal,
  EditDateModal,
  ProgressBar,
  StarRating,
  SelectedReadingOption,
  EditBtn,
} from "../../components";

const ReadingListCard = ({
  showProgressBar = true,
  showReadDate = false,
  isReading = false,
  currentList,
  book,
}) => {
  // Book information in connection with the user
  const { addedToListAt, finishedReadingAt, currentPage, userRating } = book;
  // Book information
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
  const [modalType, setModalType] = useState(null);
  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setModalType(null);
    setIsModalOpen(false);
  };

  return (
    <div className="readinglist-card">
      {/* COVER */}
      <div>
        <Link to={`/buch/${googleBookId}`}>
          <img
            className="readinglist-card-cover"
            loading="lazy"
            src={imageURL}
            alt="title"
          />
        </Link>
      </div>

      {/* BOOK INFOS */}
      <div className="readinglist-card-container">
        <div className="readinglist-card-info-wrapper">
          <Link to={`/buch/${googleBookId}`} className="no-text-decoration">
            <h2 className="readinglist-card-title">{title}</h2>
          </Link>
          <h3 className="readinglist-card-author">
            {author &&
              author.map((person, index) => (
                <span key={index}>
                  {person}
                  {index < author.length - 1 && ", "}
                </span>
              ))}
          </h3>
          <div className="mb-1"></div>

          {isReading && (
            <>
              <SelectedReadingOption
                bookId={googleBookId}
                bookTitle={title}
                bookAuthors={author}
                bookPageCount={pageCount}
                bookAverageRating={googleAverageRating}
                bookImage={secureImageURL(imageURL)}
                openModal={openModal}
              />
              <div className="mb-1"></div>
            </>
          )}
        </div>

        {/* DATES & PROGESS */}
        <div className="readinglist-card-progress-wrapper">
          {/* Date added */}
          <div className="readinglist-card-date">
            <span>Hinzugefügt:</span>
            <div>
              <p>{formatDate(addedToListAt)}</p>
              <EditBtn
                type="button"
                ariaLabel="Hinzugefügt Datum ändern"
                onClick={() => openModal("addedToListAt")}
              />
            </div>
          </div>

          {/* Date read */}
          {showReadDate && (
            <div className="readinglist-card-date">
              <span>Zu Ende gelesen:</span>
              <div>
                <p>{formatDate(finishedReadingAt)}</p>
                <EditBtn
                  type="button"
                  ariaLabel="Zu Ende gelsen Datum ändern"
                  onClick={() => openModal("finishedReadingAt")}
                />
              </div>
            </div>
          )}
          {/* Modal to edit the date */}
          <EditDateModal
            isOpen={isModalOpen}
            onClose={closeModal}
            currentList={currentList}
            bookId={_id}
            bookEntryId={book._id}
            dateType={modalType}
            currentDate={
              modalType === "addedToListAt" ? addedToListAt : finishedReadingAt
            }
          />

          {/* Progress */}
          {showProgressBar && (
            <ProgressBar
              currentPage={currentPage}
              pageCount={pageCount}
              updatedAt={updatedAt}
              openModal={() => openModal("progress")}
            />
          )}
          {/* Select Reading List */}
          <div className="mt-1"></div>
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

      {/* Modal to update current reading page */}
      <UpdateProgressModal
        bookPageCount={pageCount}
        currentPage={currentPage}
        bookEntryId={book._id}
        isOpen={isModalOpen && modalType === "progress"}
        onClose={closeModal}
      />
    </div>
  );
};
export default ReadingListCard;
