import ProgressBar from "../ProgressBar/ProgressBar";
import StarRating from "../StarRating/StarRating";
import "./BookListCard.css";

const BookListCard = () => {
  return (
    <div className="booklist-card">
      {/* COVER */}
      <div>
        <img
          className="booklist-cover"
          src="https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1482945930l/33597147._SY75_.jpg"
          alt="title"
        />
      </div>
      {/* DETAILS */}
      <div>
        <h2 className="booklist-title">Not Another Love Song</h2>
        <h3 className="booklist-author">Jennifer Lynn Barnes</h3>
        <StarRating
          averageRating={3}
          ratingsCount={0}
          showRatingsCount={false}
        />
      </div>
      {/* DATE ADDED */}
      <div className="booklist-date">
        <span>Hinzugefügt am:</span>
        <p>08.08.2024</p>
      </div>
      {/* PROGRESS */}
      <ProgressBar />
    </div>
  );
};
export default BookListCard;
