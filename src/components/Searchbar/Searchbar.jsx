import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import Tippy from "@tippyjs/react";
import "./Searchbar.css";
import "tippy.js/dist/tippy.css";
import { useGlobalContext } from "../../context";

const Searchbar = () => {
  const { searchTerm, setSearchTerm } = useGlobalContext();
  const [isError, setIsError] = useState(false);

  const fetchBooks = async () => {
    const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
      );
      const books = response.data.items;
      books.forEach((book) => {
        console.log(book.volumeInfo);
        console.log(`${book.volumeInfo.title}, ${book.volumeInfo.authors}`);
      });
    } catch (error) {
      setIsError(true);
      console.log(error.response);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchBooks();
    setSearchTerm("");
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar-form">
      <div className="searchbar-container">
        <input
          type="text"
          id="searchTerm"
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
