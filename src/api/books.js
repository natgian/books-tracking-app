import axios from "axios";

export const fetchBooks = async (searchTerm) => {
  const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}`
  );
  return result.data.items || [];
};
