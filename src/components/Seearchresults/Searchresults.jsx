import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context";
import axios from "axios";
import "./Searchresults.css";
import defaultCover from "../../assets/no-cover.jpg";

const Searchresults = () => {
  const { searchTerm } = useGlobalContext();

  const { isPending, isError, data } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
      );
      return result.data.items || [];
    },
    enabled: !!searchTerm, // Only run the query if searchTerm is not empty
  });

  if (!searchTerm) {
    return null;
  }

  if (isPending) {
    return <section className="text-center">Loading...</section>;
  }

  if (isError) {
    console.log(isError);
    return (
      <section className="text-center">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
      </section>
    );
  }

  if (data.length < 1) {
    return (
      <section className="text-center">
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
