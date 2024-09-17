import "./ReadingLists.css";
import { useState } from "react";

import { ReadingListsNavbar, BookList, PageTitle } from "../../components";

const ReadingLists = () => {
  const [currentList, setCurrentList] = useState("reading");
  return (
    <section className="section-container">
      <PageTitle text="Deine Leselisten" lineWidth="14rem" />
      <ReadingListsNavbar />
      <BookList />
    </section>
  );
};
export default ReadingLists;
