import { useCallback, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { BiSearch } from "react-icons/bi";
import "./Searchbar.css";
import "tippy.js/dist/tippy.css";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  // Memoize the debounced function using useCallback
  const debouncedNavigate = useCallback(
    debounce((value) => {
      if (value) {
        navigate(`/suchresultate?q=${value}`);
      }
    }, 500),
    [] // The dependencies array is empty, so this function is only created once
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      debouncedNavigate(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      navigate(`/suchresultate?q=${inputValue}`);
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
      />

      <button type="submit" className="searchbar-btn">
        <BiSearch className="searchbar-icon" />
      </button>
    </Form>
  );
};
export default Searchbar;
