import "./ReadingLists.css";

import { ReadingListsNavbar, BookList } from "../../components";

const ReadingLists = () => {
  return (
    <section className="section-container">
      <ReadingListsNavbar />
      <BookList />
    </section>
  );
};
export default ReadingLists;
