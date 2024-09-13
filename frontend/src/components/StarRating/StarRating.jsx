import "./StarRating.css";
import { BiSolidStarHalf } from "react-icons/bi";
import { BiSolidStar } from "react-icons/bi";

const StarRating = ({
  averageRating,
  ratingsCount,
  showRatingsCount = true,
}) => {
  if (averageRating == null || isNaN(averageRating)) {
    return null;
  }

  return (
    <div className="ratings-container">
      <div className="stars-container">
        {[...Array(5)].map((_, index) => {
          if (averageRating >= index + 1) {
            return <BiSolidStar key={index} className="star" />;
          } else if (averageRating >= index + 0.5) {
            return <BiSolidStarHalf key={index} className="star" />;
          } else {
            return <BiSolidStar key={index} className="empty-star" />;
          }
        })}
      </div>
      {showRatingsCount && (
        <div className="ratings">
          {averageRating} von 5 ({ratingsCount}{" "}
          {ratingsCount === 1 ? "Bewertung" : "Bewertungen"})
        </div>
      )}
    </div>
  );
};
export default StarRating;
