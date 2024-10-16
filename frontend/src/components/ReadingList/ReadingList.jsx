import "./ReadingList.css";
import SortBtn from "../Buttons/SortBtn";
import ReadingListCard from "../ReadingListCard/ReadingListCard";
import { useAuthContext } from "../../hooks/useAuthContext";

const ReadingList = () => {
  const { user } = useAuthContext();
  const { readingLists } = user;

  return (
    <section className="readinglist-container">
      <SortBtn />
      {readingLists.tbr.map((book) => {
        return (
          <ReadingListCard
            key={book._id}
            book={book}
            showProgressBar={false}
            showReadDate={false}
          />
        );
      })}
    </section>
  );
};
export default ReadingList;
