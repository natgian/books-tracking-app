import { useCallback, useState, useRef } from "react";
import { debounce } from "lodash";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Tippy from "@tippyjs/react";
import "./Searchbar.css";
import "tippy.js/dist/tippy.css";
import { useGlobalContext } from "../../context";
import { Form, useNavigate } from "react-router-dom";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Memoize the debounced function using useCallback
  const debouncedSetSearchTerm = useCallback(
    debounce((value) => {
      setSearchTerm(value); // Set the search term after 500ms of debouncing
    }, 500),
    [] // The dependencies array is empty, so this function is only created once
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedSetSearchTerm(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setSearchTerm(inputValue);
    if (searchTerm) {
      navigate(`/suchresultate?query=${inputValue}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="searchbar-form">
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Titel / Autor / ISBN ..."
        aria-label="Suchbegriff eingeben"
        className="searchbar-input"
        value={inputValue}
        onChange={handleChange}
        ref={inputRef}
      />

      <button type="submit" className="searchbar-btn">
        <BiSearch className="searchbar-icon" />
      </button>
    </Form>
  );
};
export default Searchbar;
