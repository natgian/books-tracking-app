import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useManageReadingList } from "../../hooks/useManageReadingList.js";
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
    value: "reading",
    label: (
      <div className="select-option-container">
        <FaBookOpenReader />
        <span>am Lesen</span>
      </div>
    ),
  },
  {
    value: "read",
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
        <span>löschen</span>
      </div>
    ),
  },
];

const SelectedReadingOption = ({
  bookId,
  bookTitle = "-",
  bookAuthors = ["-"],
  bookISBN,
  bookCategories,
  bookPublisher = "-",
  bookPublishedDate = "-",
  bookPageCount = "-",
  bookLanguage = "-",
  bookAverageRating,
  bookImage,
  isBlock = false,
}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 468);
  const { addBookMutation, removeBookMutation } = useManageReadingList();

  // Tracking if device format is mobile for component adjustments
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 468);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Sets the SelectedOption to the name of the list that contains the current book
  useEffect(() => {
    if (user && user.readingLists) {
      const listName = Object.keys(user.readingLists).find((list) => {
        const currentList = user.readingLists[list];
        return (
          Array.isArray(currentList) &&
          currentList.some((item) => item.book.googleBookId === bookId)
        );
      });

      setSelectedOption(listName || null);
    }
  }, [user, bookId]);

  const handleSelectChange = async (option) => {
    if (!user || !user._id) {
      navigate("/login", {
        state: {
          from: { pathname: `/buch/${bookId}` },
          message: " Bitte anmelden um das Buch einer Leseliste hinzuzufügen.",
        },
      });
      return;
    }

    const bookData = {
      bookId,
      bookTitle,
      bookAuthors,
      bookISBN,
      bookCategories,
      bookPublisher,
      bookPublishedDate,
      bookPageCount,
      bookLanguage,
      bookAverageRating,
      bookImage,
    };

    if (option.value === "remove") {
      removeBookMutation.mutate({ userId: user._id, bookId });
    } else {
      addBookMutation.mutate({
        userId: user._id,
        listName: option.value,
        book: bookData,
      });
    }

    setSelectedOption(option.value);
  };

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      maxWidth: "20px",
      minWidth: isMobile ? "160px" : "180px",
      fontSize: isMobile ? "0.75rem" : "1rem",
      borderRadius: "50px",
      paddingLeft: isMobile ? "0.25rem" : "1rem",
      backgroundColor: getBackgroundColor(selectedOption),
      color: "var(--text-color)",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "var(--secondary-color-200-light)",
      },
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      minWidth: isMobile ? "160px" : "180px",
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
    menu: (baseStyles) => ({
      ...baseStyles,
      maxWidth: isMobile ? "160px" : "180px",
      fontSize: isMobile ? "0.75rem" : "1rem",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      maxWidth: isMobile ? "160px" : "180px",
      fontSize: "0.875rem",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
    }),
  };

  const getBackgroundColor = (value) => {
    switch (value) {
      case "tbr":
        return "#f4a460";
      case "read":
        return "#98c379";
      case "reading":
        return "#F4D36F";
      default:
        return "hsl(0, 0%, 100%)";
    }
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Leseliste +"
      aria-label="Leseliste auswählen"
      onChange={handleSelectChange}
      value={options.find((opt) => opt.value === selectedOption) || null}
      isSearchable={false}
    />
  );
};

export default SelectedReadingOption;
