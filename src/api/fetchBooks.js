import axiosConfig from "./axiosConfig";

export const fetchBooks = async (
  searchTerm,
  startIndex = 0,
  maxResults = 10
) => {
  const result = await axiosConfig.get("/volumes", {
    params: {
      q: searchTerm,
      startIndex,
      maxResults,
    },
  });
  return result.data.items || [];
};

// https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=${apiKey}
