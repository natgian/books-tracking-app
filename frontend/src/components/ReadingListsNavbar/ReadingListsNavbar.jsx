import { useState } from "react";
import "./ReadingListsNavbar.css";
import { FaBookOpenReader, FaBookBookmark, FaCheck } from "react-icons/fa6";

const ReadingListsNavbar = ({ setCurrentList }) => {
  const [activeTab, setActiveTab] = useState("reading");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setCurrentList(tabName);
  };

  return (
    <nav>
      <ul className="reading-lists-nav">
        <li>
          <button
            className={
              activeTab === "reading"
                ? "reading-list-tab active-tab"
                : "reading-list-tab"
            }
            onClick={() => handleTabClick("reading")}
          >
            <FaBookOpenReader size={"3rem"} />
            <span>am Lesen</span>
          </button>
        </li>
        <li>
          <button
            className={
              activeTab === "tbr"
                ? "reading-list-tab active-tab"
                : "reading-list-tab"
            }
            onClick={() => handleTabClick("tbr")}
          >
            <FaBookBookmark size={"3rem"} />
            <span>zum Lesen</span>
          </button>
        </li>
        <li>
          <button
            className={
              activeTab === "read"
                ? "reading-list-tab active-tab"
                : "reading-list-tab"
            }
            onClick={() => handleTabClick("read")}
          >
            <FaCheck size={"3rem"} />
            <span>gelesen</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default ReadingListsNavbar;
