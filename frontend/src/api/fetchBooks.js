import googleAxiosConfig from "./googleAxiosConfig";
import { isValidISBN } from "../utilities/isValidISBN";

const DEFAULT_START_INDEX = 0;
const DEFAULT_MAX_RESULTS = 12;

/**
 * Fetches books by search term or ISBN.
 * If the search term is a valid ISBN, it searches by ISBN directly, otherwise it performs a general search.
 *
 * @param {string} searchTerm - The search term or ISBN to search for
 * @param {number} startIndex - The start search index
 * @param {number} maxResults - The maximum number of results to return
 * @returns {Promise<Array>} - A list of books or an empty array
 */
export const fetchBooks = async (searchTerm, startIndex = DEFAULT_START_INDEX, maxResults = DEFAULT_MAX_RESULTS) => {
  const isISBN = isValidISBN(searchTerm);
  const query = isISBN ? `isbn:${searchTerm}` : searchTerm;

  try {
    const result = await googleAxiosConfig.get("/volumes", {
      params: {
        q: query,
        startIndex,
        maxResults,
        orderBy: "relevance",
        printType: "books",
        showPreorders: true,
      },
    });
    return result.data.items || [];
  } catch (error) {
    throw new Error(`Failed to fetch books for "${searchTerm}": ${error.message}`);
  }
};

// GET https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}
