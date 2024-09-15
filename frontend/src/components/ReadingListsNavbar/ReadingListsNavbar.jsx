import "./ReadingListsNavbar.css";
import { FaBookOpenReader, FaBookBookmark, FaCheck } from "react-icons/fa6";

const ReadingListsNavbar = () => {
  return (
    <nav>
      <ul className="reading-lists-nav">
        <li>
          <button className="reading-list-tab active-tab">
            <FaBookOpenReader size={"3rem"} />
            <span>am Lesen</span>
          </button>
        </li>
        <li>
          <button className="reading-list-tab">
            <FaBookBookmark size={"3rem"} />
            <span>zum Lesen</span>
          </button>
        </li>
        <li>
          <button className="reading-list-tab">
            <FaCheck size={"3rem"} />
            <span>gelesen</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default ReadingListsNavbar;
