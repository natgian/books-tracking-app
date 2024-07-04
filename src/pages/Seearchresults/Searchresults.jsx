import { useGlobalContext } from "../../context";
import { useBooks } from "../../hooks/useBooks";
import "./Searchresults.css";
import defaultCover from "../../assets/no-cover.jpg";
import { BiErrorCircle } from "react-icons/bi";

const Searchresults = () => {
  const { searchTerm } = useGlobalContext();
  const { data, isPending, isError, error } = useBooks(searchTerm);

  if (!searchTerm) {
    return null;
  }

  if (isPending) {
    return (
      <section className="text-center section-container">
        Wird geladen...
      </section>
    );
  }

  if (isError) {
    return (
      <section className="text-center section-container">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
        <div className="error">
          <BiErrorCircle />
          {error.message}
        </div>
      </section>
    );
  }

  if (data.length < 1) {
    return (
      <section className="text-center section-container">
        Die Suche ergab leider keine Treffer.
      </section>
    );
  }

  console.log(data);

  return (
    <section className="section-container searchresults-container">
      {data.map((book) => {
        return (
          <a href="#" key={book.id}>
            <div className="searchresult-wrapper">
              <div className="searchresult-cover-wrapper">
                <img
                  src={
                    book.volumeInfo?.imageLinks?.smallThumbnail || defaultCover
                  }
                  alt={book.volumeInfo.title}
                />
              </div>
              <div className="searchresult-details-wrapper">
                <p className="searchresult-title">{book.volumeInfo.title}</p>
                <p className="searchresult-author">
                  {book.volumeInfo.authors &&
                    (book.volumeInfo.authors.length > 1
                      ? book.volumeInfo.authors.join(", ")
                      : book.volumeInfo.authors)}
                </p>
              </div>
            </div>
          </a>
        );
      })}
    </section>
  );
};
export default Searchresults;
