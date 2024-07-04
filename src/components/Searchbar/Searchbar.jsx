import { useCallback, useState, useRef } from "react";
import { debounce } from "lodash";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Tippy from "@tippyjs/react";
import "./Searchbar.css";
import "tippy.js/dist/tippy.css";
import { useGlobalContext } from "../../context";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit} className="searchbar-form">
      <div className="searchbar-container">
        <input
          type="text"
          id="search"
          name="search"
          placeholder="Titel / Autor / ISBN ..."
          aria-label="Suchbegriff eingeben"
          className="searchbar-input"
          value={inputValue}
          onChange={handleChange}
          ref={inputRef}
        />

        {searchTerm && (
          <Tippy content="Suchbegriff löschen">
            <button
              type="button"
              className="remove-input-btn"
              aria-label="Suchbegriff löschen"
              onClick={() => {
                setInputValue("");
                setSearchTerm("");
                inputRef.current.focus();
              }}
            >
              <CgClose />
            </button>
          </Tippy>
        )}

        <button type="submit" className="searchbar-icon">
          <BiSearch />
        </button>
      </div>
    </form>
  );
};
export default Searchbar;
