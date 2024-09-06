import axiosConfig from "./axiosConfig";

export const fetchAuthorBooks = async (
  author,
  startIndex = 0,
  maxResults = 12
) => {
  const result = await axiosConfig.get("/volumes", {
    params: {
      q: `inauthor:${author}`,
      startIndex,
      maxResults,
    },
  });
  return result.data.items || [];
};
