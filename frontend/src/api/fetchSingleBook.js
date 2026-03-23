import googleAxiosConfig from "./googleAxiosConfig";

/**
 * Fetches a single book.
 *
 * @param {string} id - The Google Books volume ID
 * @returns {Promise<Object>} - The book data object
 */
export const fetchSingleBook = async (id) => {
  try {
    const result = await googleAxiosConfig.get(`/volumes/${id}`);
    return result.data;
  } catch (error) {
    throw new Error(`Failed to fetch book with ID "${id}": ${error.message}`);
  }
};
