import googleAxiosConfig from "./googleAxiosConfig";
import { DEFAULT_START_INDEX, DEFAULT_MAX_RESULTS } from "./googleAxiosConfig";

/**
 * Fetches books by author.
 *
 * @param {string} author - The author the user is searching
 * @param {number} startIndex - The start search index
 * @param {number} maxResults - The maximum number of results to return
 * @returns {Promise<Array>} - A list of books or an empty array
 */
export const fetchAuthorBooks = async (author, startIndex = DEFAULT_START_INDEX, maxResults = DEFAULT_MAX_RESULTS) => {
  try {
    const result = await googleAxiosConfig.get("/volumes", {
      params: {
        q: `inauthor:${author}`,
        startIndex,
        maxResults,
        orderBy: "relevance",
        printType: "books",
        showPreorders: true,
      },
    });
    return result.data.items || [];
  } catch (error) {
    throw new Error(`Failed to fetch books for author ${author}: ${error.message}`);
  }
};
