import { useEffect, useState } from "react";
import Select from "react-select";

const options = [
  {
    value: "title",
    label: "Titel",
  },
  {
    value: "author",
    label: "Autor",
  },
  {
    value: "addedToListAt",
    label: "hinzugefügt am",
  },
];

const SortBtn = ({ onSort, currentList, currentSortBy }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Update the selected option when currentList or currentSortBy changes
  useEffect(() => {
    const matchedOption =
      options.find((opt) => opt.value === currentSortBy) || null;
    setSelectedOption(matchedOption);
  }, [currentSortBy, currentList]);

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      width: "12rem",
      borderRadius: "50px",
      marginTop: "1.25rem",
      paddingLeft: "1rem",
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
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      width: "12rem",
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
    }),
    menuList: (baseStyles) => ({
      ...baseStyles,
      borderBottomLeftRadius: "25px",
      borderBottomRightRadius: "25px",
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

  const handleSortChange = (option) => {
    setSelectedOption(option.value); // Update selected option
    onSort(option.value); // Trigger parent sorting function
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Sortieren nach"
      aria-label="Sortieren nach"
      onChange={handleSortChange}
      value={selectedOption}
      isSearchable={false}
    />
  );
};

export default SortBtn;
