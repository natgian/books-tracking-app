import "./BookList.css";
import SortBtn from "../Buttons/SortBtn";
import BookListCard from "../BookListCard/BookListCard";

const BookList = () => {
  return (
    <section className="booklist-container">
      <SortBtn />
      <BookListCard showProgressBar={true} />
      <BookListCard showProgressBar={false} showReadDate={true} />
      <BookListCard />
      <BookListCard />
      <BookListCard />
    </section>
  );
};
export default BookList;
