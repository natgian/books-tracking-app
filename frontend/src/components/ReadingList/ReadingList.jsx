import "./ReadingList.css";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useReadingLists } from "../../hooks/useReadingLists";
import { BiErrorCircle } from "react-icons/bi";
import { SortBtn, ReadingListCard, Loading } from "../index";

const ReadingList = ({ currentList }) => {
  const { user } = useAuthContext();
  const booksTotal = user.readingLists[currentList]?.length || 0; // Number of books
  const [currentSortBy, setCurrentSortBy] = useState(null);
  const [sortedReadingList, setSortedReadingList] = useState([]); // Visible sorted books
  const { ref, inView } = useInView({ threshold: 1.0 }); // Trigger only when fully visible

  // Fetch paginated books from current list
  const {
    allBooks,
    error,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useReadingLists({ currentList, user });

  // Reset pagination and refetch data whenever currentList changes
  useEffect(() => {
    refetch(); // Triggers a refetch for the new list type
  }, [user, currentList, refetch]);

  // Apply sorting whenever books or sort criteria change
  useEffect(() => {
    const sortBooks = () => {
      if (!currentSortBy) {
        setSortedReadingList(allBooks); // Default: no sorting
        return;
      }

      const sorted = [...allBooks].sort((a, b) => {
        if (currentSortBy === "title") {
          return a.book.title.localeCompare(b.book.title);
        } else if (currentSortBy === "author") {
          const authorA = a.book.author.join(", ");
          const authorB = b.book.author.join(", ");
          return authorA.localeCompare(authorB);
        } else if (currentSortBy === "addedToListAt") {
          return new Date(b.addedToListAt) - new Date(a.addedToListAt);
        }
        return 0;
      });

      setSortedReadingList(sorted);
    };

    sortBooks();
  }, [allBooks, currentSortBy]);

  // Fetch next page of books
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  // LOADING STATE
  if (isLoading) {
    return (
      <section className="text-center section-container">
        <Loading />
        Wird geladen...
      </section>
    );
  }

  // ERROR STATE
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
        {/* Sort Button */}
        <SortBtn
          onSort={(sortBy) => setCurrentSortBy(sortBy)}
          currentList={currentList}
          currentSortBy={currentSortBy}
        />
        {/* Number of Books */}
        <p>
          ({booksTotal} {booksTotal < 2 && booksTotal !== 0 ? "Buch" : "Bücher"}
          )
        </p>
      </div>

      {/* Render Sorted List */}
      {sortedReadingList.map((book) => (
        <ReadingListCard
          key={book._id}
          book={book}
          currentList={currentList}
          showProgressBar={currentList === "reading"}
          showReadDate={currentList === "read"}
          isReading={currentList === "reading"}
        />
      ))}

      {/* Invisible Observer Target for Intersection */}
      <div ref={ref}>
        {/* Loading Indicator for Infinite Scrolling */}
        {isFetchingNextPage && (
          <div className="text-center section-container">
            <Loading />
          </div>
        )}
      </div>
    </section>
  );
};
export default ReadingList;
