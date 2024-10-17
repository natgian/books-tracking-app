import "./ReadingLists.css";
import { useState } from "react";
import { ReadingListsNavbar, ReadingList, PageTitle } from "../../components";

const ReadingLists = () => {
  const [currentList, setCurrentList] = useState("reading");

  return (
    <section className="section-container">
      <PageTitle text="Deine Leselisten" lineWidth="14rem" />
      <ReadingListsNavbar setCurrentList={setCurrentList} />
      <ReadingList currentList={currentList} />
    </section>
  );
};
export default ReadingLists;
