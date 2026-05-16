import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import "./Searchbar.css";

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/suchresultate?q=${inputValue.trim()}`);
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
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button type="submit" className="searchbar-btn" aria-label="suchen">
        <BiSearch className="searchbar-icon" />
      </button>
    </Form>
  );
};
export default Searchbar;
