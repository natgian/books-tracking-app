import axios from "axios";

export const fetchSingleBook = async (id) => {
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes/${id}`
  );
  return result.data;
};
