import { FaBookOpenReader, FaBookBookmark, FaCheck } from "react-icons/fa6";

const ReadingListsNavbar = () => {
  return (
    <nav>
      <ul className="reading-lists-nav">
        <li>
          <button className="reading-list-tab active-tab">
            <FaBookOpenReader size={"3rem"} />
            <span>Am Lesen</span>
          </button>
        </li>
        <li>
          <button className="reading-list-tab">
            <FaBookBookmark size={"3rem"} />
            <span>Will ich lesen</span>
          </button>
        </li>
        <li>
          <button className="reading-list-tab">
            <FaCheck size={"3rem"} />
            <span>Gelesen</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default ReadingListsNavbar;
