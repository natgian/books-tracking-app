import googleAxiosConfig from "./googleAxiosConfig";
import { isValidISBN } from "../utilities/isValidISBN";

const DEFAULT_START_INDEX = 0;
const DEFAULT_MAX_RESULTS = 12;

/**
 * Builds the query strin with the search term depending on the search type
 *
 * @param {string} searchTerm - The search term or ISBN to search for
 * @param {string} searchType - The search type ("all", "title", "author" or "isbn")
 * @returns - A string with the query
 */
const buildQuery = (searchTerm, searchType) => {
  switch (searchType) {
    case "isbn":
      return `isbn:${searchTerm}`;
    case "title":
      return `intitle:"${searchTerm}"`;
    case "author":
      return `inauthor:"${searchTerm}"`;
    default:
      if (isValidISBN(searchTerm)) return `isbn:${searchTerm}`;
      return searchTerm;
  }
};

/**
 * Fetches books by search term or ISBN.
 * If the search term is a valid ISBN, it searches by ISBN directly, otherwise it performs
 * a search in title or author.
 *
 * @param {string} searchTerm - The search term or ISBN to search for
 * @param {string} searchType - The search type ("all", "title", "author" or "isbn")
 * @param {number} startIndex - The start search index
 * @param {number} maxResults - The maximum number of results to return
 * @returns {Promise<Array>} - A list of books or an empty array
 */
export const fetchBooks = async (searchTerm, searchType, startIndex = DEFAULT_START_INDEX, maxResults = DEFAULT_MAX_RESULTS) => {
  const query = buildQuery(searchTerm, searchType);

  try {
    const result = await googleAxiosConfig.get("/volumes", {
      params: {
        q: query,
        startIndex,
        maxResults,
        orderBy: "relevance",
        printType: "books",
        fields: "items(id,volumeInfo(title,authors,imageLinks,language),saleInfo(isEbook))",
        showPreorders: true,
      },
    });
    return result.data.items || [];
  } catch (error) {
    throw new Error(`Failed to fetch books for "${searchTerm}": ${error.message}`);
  }
};

// GET https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}
