import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import "./Searchbar.css";

const placeholders = {
  all: "Titel / Autor / ISBN",
  title: "Titel eingeben",
  author: "Autor eingeben",
  isbn: "ISBN eingeben",
};

const Searchbar = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchType, setSearchType] = useState("all");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/suchresultate?q=${inputValue.trim()}&type=${searchType}`);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="searchbar-form">
      <select className="searchbar-select" value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="all">Alles</option>
        <option value="title">Titel</option>
        <option value="author">Autor</option>
        <option value="isbn">ISBN</option>
      </select>

      <div className="input-btn-wrapper">
        <input
          type="search"
          id="search"
          name="search"
          placeholder={placeholders[searchType]}
          aria-label="Suchbegriff eingeben"
          className="searchbar-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button type="submit" className="searchbar-btn" aria-label="suchen">
          <BiSearch className="searchbar-icon" />
        </button>
      </div>
    </Form>
  );
};
export default Searchbar;
