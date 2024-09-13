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
        <h2>The Final Gambit</h2>
        <h3>Jennifer Lynn Barnes</h3>
        <StarRating
          averageRating={3}
          ratingsCount={0}
          showRatingsCount={false}
        />
      </div>
    </div>
  );
};
export default BookListCard;
