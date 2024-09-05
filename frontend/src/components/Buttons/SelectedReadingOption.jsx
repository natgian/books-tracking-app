import { useState } from "react";
import Select from "react-select";
import {
  FaBookOpenReader,
  FaBookBookmark,
  FaCheck,
  FaTrashCan,
} from "react-icons/fa6";

const options = [
  {
    value: "tbr",
    label: (
      <div className="select-option-container">
        <FaBookBookmark />
        <span>will ich lesen</span>
      </div>
    ),
  },
  {
    value: "read",
    label: (
      <div className="select-option-container">
        <FaBookOpenReader />
        <span>am Lesen</span>
      </div>
    ),
  },
  {
    value: "reading",
    label: (
      <div className="select-option-container">
        <FaCheck />
        <span>gelesen</span>
      </div>
    ),
  },
  {
    value: "remove",
    label: (
      <div className="select-option-container">
        <FaTrashCan />
        <span>aus Liste löschen</span>
      </div>
    ),
  },
];

const SelectedReadingOption = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (option) => {
    if (option.value === "remove") {
      setSelectedOption(null);
    } else {
      setSelectedOption(option.value);
    }
  };

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: "0.75rem",
      marginTop: "1rem",
      paddingLeft: "1rem",
      backgroundColor: getBackgroundColor(selectedOption),
      color: "var(--text-color)",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "var(--action-200)",
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "var(--text-color)",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--text-color)",
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "var(--text-color)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      paddingLeft: "1.85rem",
      backgroundColor: state.isSelected
        ? "var(--action-300)"
        : "var(--bg-color)",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "var(--action-100)",
      },
    }),
  };

  const getBackgroundColor = (value) => {
    switch (value) {
      case "tbr":
        return "#f4a460";
      case "read":
        return "#98c379";
      case "reading":
        return "#BBDEFB";
      case "remove":
        return "#7fb3d5";
      default:
        return "var(--action-100)";
    }
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Leseliste +"
      aria-label="Leseliste bearbeiten"
      onChange={handleSelectChange}
      value={options.find((opt) => opt.value === selectedOption) || null}
      isSearchable={false}
    />
  );
};

export default SelectedReadingOption;
