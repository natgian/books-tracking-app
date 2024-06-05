import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchTerm);
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar-form">
      <div className="searchbar-container">
        <input
          type="text"
          id="searchTerm"
          placeholder="Titel / Autor / ISBN ..."
          className="searchbar-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            className="remove-input-btn"
            onClick={() => setSearchTerm("")}
          >
            <CgClose />
          </button>
        )}

        <button type="submit" className="searchbar-icon">
          <BiSearch />
        </button>
      </div>
    </form>
  );
};
export default Searchbar;
