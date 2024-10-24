import { useState } from "react";
import Select from "react-select";

const options = [
  {
    value: "Titel",
    label: "Titel",
  },
  {
    value: "Autor",
    label: "Autor",
  },
  {
    value: "hinzugefügt am",
    label: "hinzugefügt am",
  },
];

const SortBtn = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const customStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      maxWidth: "12rem",
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
      maxWidth: "12rem",
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

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder="Sortieren nach"
      aria-label="Sortieren nach"
      onChange={(option) => {
        setSelectedOption(option.value);
      }}
      value={options.find((opt) => opt.value === selectedOption) || null}
      isSearchable={false}
    />
  );
};

export default SortBtn;
