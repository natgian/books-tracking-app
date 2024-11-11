import "./ReadingList.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useReadingLists } from "../../hooks/useReadingLists";
import { BiErrorCircle } from "react-icons/bi";
import { SortBtn, ReadingListCard, Loading } from "../index";

const ReadingList = ({ currentList }) => {
  const { user } = useAuthContext();
  const userId = user?._id;

  //Fetch reading lists data
  const {
    data: readingLists,
    isPending,
    isError,
    error,
  } = useReadingLists(userId);

  // Original list data for resetting
  const [sortedReadingList, setSortedReadingList] = useState([]);

  // Whenever "currentList" changes or new "readingLists" data is fetched, reset sorted list
  useEffect(() => {
    if (readingLists && readingLists[currentList]) {
      setSortedReadingList([...readingLists[currentList]]);
    }
  }, [readingLists, currentList]);

  const sortReadingList = (sortBy) => {
    const sorted = [...sortedReadingList].sort((a, b) => {
      if (sortBy === "title") {
        return a.book.title.localeCompare(b.book.title);
      } else if (sortBy === "author") {
        const authorA = a.book.author.join(", ");
        const authorB = b.book.author.join(", ");
        return authorA.localeCompare(authorB);
      } else if (sortBy === "addedToListAt") {
        return new Date(b.addedToListAt) - new Date(a.addedToListAt);
      }
      return 0;
    });
    setSortedReadingList(sorted);
  };

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

  return (
    <section className="readinglist-container">
      <div className="readinglist-sort-container">
        <SortBtn onSort={sortReadingList} currentList={currentList} />
        <p>
          ({sortedReadingList.length}{" "}
          {sortedReadingList.length < 2 ? "Buch" : "Bücher"})
        </p>
      </div>
      {sortedReadingList.map((book) => {
        return (
          <ReadingListCard
            key={book._id}
            book={book}
            currentList={currentList}
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
