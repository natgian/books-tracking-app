import { useQuery } from "@tanstack/react-query";
import { useGlobalContext } from "../../context";
import axios from "axios";

// const fetchBooks = async () => {
//   const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
//   try {
//     const response = await axios.get(
//       `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
//     );
//     const books = response.data.items;
//     books.forEach((book) => {
//       console.log(book.volumeInfo);
//       console.log(`${book.volumeInfo.title}, ${book.volumeInfo.authors}`);
//     });
//   } catch (error) {
//     setIsError(true);
//     console.log(error.response);
//   }
// };

const Searchresults = () => {
  const { searchTerm } = useGlobalContext();

  const { isPending, isError, data } = useQuery({
    queryKey: ["books", searchTerm],
    queryFn: async () => {
      const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

      const result = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=potter&key=${apiKey}`
      );
      return result.data.items;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log(isError);
    return <div>Etwas ist schiefgelaufen...</div>;
  }

  if (data.length < 1) {
    return <div>Keine Resultate mit diesem Suchbegriff...</div>;
  }

  console.log(data);

  return (
    <section className="section-container">
      {data.map((book) => {
        return <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="" />;
      })}
    </section>
  );
};
export default Searchresults;
