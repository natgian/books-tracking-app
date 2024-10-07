import googleAxiosConfig from "./googleAxiosConfig";
import { isValidISBN } from "../utilities/isValidISBN";

export const fetchBooks = async (
  searchTerm,
  startIndex = 0,
  maxResults = 12
) => {
  const isISBN = isValidISBN(searchTerm);
  const query = isISBN ? `isbn:${searchTerm}` : searchTerm;

  const result = await googleAxiosConfig.get("/volumes", {
    params: {
      q: query,
      startIndex,
      maxResults,
    },
  });
  return result.data.items || [];
};

// GET https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}
