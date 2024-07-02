import { useState } from "react";
import "./Book.css";
import { BiSolidDownArrow } from "react-icons/bi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Book = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const getBackgroundClass = () => {
    if (selectedOption === "want to read") {
      return "tbr";
    }
    if (selectedOption === "read") {
      return "read";
    }
    if (selectedOption === "reading") {
      return "reading";
    }
  };

  return (
    <section className="book-details section-container">
      <div className="book-cover-container">
        <img
          src="https://images.thalia.media/00/-/6ca5129269624803a37091db8624a685/die-letzte-nacht-gebundene-ausgabe-karin-slaughter.jpeg"
          alt=""
          className="book-cover"
        />
        <Tippy content="Leseliste bearbeiten">
          <div className="custom-select">
            <BiSolidDownArrow className="select-arrow" />
            <select
              className={`btn-select ${getBackgroundClass()}`}
              aria-label="Leseliste bearbeiten"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Leseliste
              </option>
              <option value="want to read">will ich lesen</option>
              <option value="read">gelesen</option>
              <option value="reading">am Lesen</option>
              <option value="">aus Listen entfernen</option>
            </select>
          </div>
        </Tippy>
      </div>

      <div className="book-details-container">
        <div className="book-header">
          <h1 className="book-title">Die letzte Nacht</h1>
          <div>
            <a href="#" className="book-author">
              Karin Slaughter
            </a>
          </div>
          <div className="book-genre-container">
            <a href="#" className="book-genre">
              Krimi
            </a>
            <a href="#" className="book-genre">
              Thriller
            </a>
          </div>
        </div>

        <p className="book-text">
          Vor fünfzehn Jahren veränderte sich Sara Lintons Leben schlagartig,
          als sie nach einem Barbesuch brutal überfallen wurde. Mittlerweile hat
          sie es geschafft, das Trauma hinter sich zu lassen: Sara ist
          erfolgreiche Ärztin und mit einem Mann verlobt, den sie liebt...
        </p>
        <div className="book-details-table">
          <table>
            <tbody>
              <tr>
                <th>ISBN:</th>
                <td>978-3-365-00370-1</td>
              </tr>
              <tr>
                <th>Verlag:</th>
                <td>Haper Collins</td>
              </tr>
              <tr>
                <th>Erscheinungsdatum:</th>
                <td>21.07.2023</td>
              </tr>
              <tr>
                <th>Seitenzah:</th>
                <td>560</td>
              </tr>
              <tr>
                <th>Sprache:</th>
                <td>Deutsch</td>
              </tr>
              <tr>
                <th>Einband:</th>
                <td>Fester Einband</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default Book;
