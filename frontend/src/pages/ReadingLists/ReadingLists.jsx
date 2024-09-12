import "./ReadingLists.css";

import { ReadingListsNavbar, BookList, PageTitle } from "../../components";

const ReadingLists = () => {
  return (
    <section className="section-container">
      <PageTitle text="Deine Leselisten" lineWidth="14rem" />
      <ReadingListsNavbar />
      <BookList />
    </section>
  );
};
export default ReadingLists;
