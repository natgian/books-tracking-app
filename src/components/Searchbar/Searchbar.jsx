import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import Tippy from "@tippyjs/react";
import "./Searchbar.css";
import "tippy.js/dist/tippy.css";
import { useGlobalContext } from "../../context";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.search.value;
    if (!searchValue) return;
    setSearchTerm(searchValue);
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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <Tippy content="Suchbegriff löschen">
            <button
              type="button"
              className="remove-input-btn"
              aria-label="Suchbegriff löschen"
              onClick={() => setSearchTerm("")}
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
