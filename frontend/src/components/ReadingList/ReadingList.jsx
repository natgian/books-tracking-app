import "./ReadingList.css";
import SortBtn from "../Buttons/SortBtn";
import ReadingListCard from "../ReadingListCard/ReadingListCard";
import Loading from "../Loading";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useReadingLists } from "../../hooks/useReadingLists";
import { BiErrorCircle } from "react-icons/bi";

const ReadingList = ({ currentList }) => {
  const { user } = useAuthContext();
  const userId = user?._id;

  const {
    data: readingLists,
    isPending,
    isError,
    error,
  } = useReadingLists(userId);

  // LOADING STATE //
  if (isPending) {
    return (
      <section className="text-center section-container">
        <Loading />
        Wird geladen...
      </section>
    );
  }

  // ERROR STATE //
  if (isError) {
    return (
      <section className="text-center section-container">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
        <div className="error-box">
          <BiErrorCircle />
          {error.message}
        </div>
      </section>
    );
  }

  const currentListBooks = readingLists[currentList] || [];

  return (
    <section className="readinglist-container">
      <SortBtn />
      {currentListBooks.map((book) => {
        return (
          <ReadingListCard
            key={book._id}
            book={book}
            showProgressBar={currentList === "reading" ? true : false}
            showReadDate={currentList === "read" ? true : false}
            isReading={currentList === "reading" ? true : false}
          />
        );
      })}
    </section>
  );
};
export default ReadingList;
