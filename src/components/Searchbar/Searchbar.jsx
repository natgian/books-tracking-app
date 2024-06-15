import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import "./Searchbar.css";

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
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
          className="searchbar-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {searchTerm && (
          <button
            type="button"
            className="remove-input-btn"
            title="löschen"
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
