import "./Book.css";
import { BiSolidDownArrow } from "react-icons/bi";

const Book = () => {
  return (
    <section className="book-details section-container">
      <div className="book-cover-container">
        <img
          src="https://images.thalia.media/00/-/6ca5129269624803a37091db8624a685/die-letzte-nacht-gebundene-ausgabe-karin-slaughter.jpeg"
          alt=""
          className="book-cover"
        />
        <div className="custom-select">
          <BiSolidDownArrow className="select-arrow" />
          <select className="btn-select">
            <option value="want to read">Will ich lesen</option>
            <option value="read">Gelesen</option>
            <option value="reading">Am Lesen</option>
          </select>
        </div>
      </div>

      <div className="book-details-container">
        <div className="book-header">
          <h1 className="book-title">Die letzte Nacht</h1>
          <a href="#" className="book-author">
            Karin Slaughter
          </a>
          <div className="book-genre-container">
            <a href="#" className="book-genre">
              Krimi
            </a>
            <a href="#" className="book-genre">
              Krimi
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
