import { useState } from "react";
import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react";
import { BiSolidDownArrow } from "react-icons/bi";

const SelectedReadingOption = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getBackgroundClass = () => {
    if (selectedOption === "want to read") {
      return "tbr";
    }
    if (selectedOption === "read") {
      return "read";
    }
    if (selectedOption === "reading") {
      return "reading";
    }
  };

  return (
    <Tippy content="Leseliste bearbeiten">
      <div className="custom-select">
        <BiSolidDownArrow className="select-arrow" />
        <select
          className={`btn-select ${getBackgroundClass()}`}
          aria-label="Leseliste bearbeiten"
          id="selectedReadingOption"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="" disabled>
            Leseliste
          </option>
          <option value="want to read">will ich lesen</option>
          <option value="read">gelesen</option>
          <option value="reading">am Lesen</option>
          <option value="">aus Listen entfernen</option>
        </select>
      </div>
    </Tippy>
  );
};
export default SelectedReadingOption;
