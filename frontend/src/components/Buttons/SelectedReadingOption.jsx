import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import backendAxiosConfig from "../../api/backendAxiosConfig.js";
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
        <span>zum Lesen</span>
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
        <span>aus Liste entfernen</span>
      </div>
    ),
  },
];

const SelectedReadingOption = ({ bookId }) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = async (option) => {
    setSelectedOption(option.value);

    if (!user || !user._id) {
      navigate("/login", {
        state: {
          from: { pathname: `/buch/${bookId}` },
          message: " Bitte anmelden um das Buch einer Leseliste hinzuzufügen.",
        },
      });
      return;
    }

    try {
      if (option.value === "remove") {
        await backendAxiosConfig.delete(
          `/readinglist/${user._id}/books/${bookId}`
        );
      } else {
        await backendAxiosConfig.post(`/readinglist/${user._id}/books`, {
          userId: user._id,
          bookId,
          listName: option.value,
        });
      }
    } catch (error) {
      console.log("Error updating reading list", error);
    }
  };

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      borderRadius: "0.75rem",
      marginTop: "1.25rem",
      paddingLeft: "1rem",
      backgroundColor: getBackgroundColor(selectedOption),
      color: "var(--text-color)",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "var(--secondary-color-200-light)",
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: "var(--text-color)",
    }),
    dropdownIndicator: (baseStyles) => ({
      ...baseStyles,
      color: "var(--text-color)",
      ":hover": {
        color: "var(--text-color)",
      },
    }),
    indicatorSeparator: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: "var(--text-color)",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      paddingLeft: "1.85rem",
      backgroundColor: state.isSelected
        ? "var(--secondary-color-300)"
        : "var(--bg-color)",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "var(--secondary-color-100)",
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
        return "hsl(0, 0%, 100%)";
    }
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Zu Leseliste hinzufügen +"
      aria-label="Leseliste bearbeiten"
      onChange={handleSelectChange}
      value={options.find((opt) => opt.value === selectedOption) || null}
      isSearchable={false}
    />
  );
};

export default SelectedReadingOption;
