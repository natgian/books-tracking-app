import axiosConfig from "./axiosConfig";

export const fetchAuthorBooks = async (
  author,
  startIndex = 0,
  maxResults = 10
) => {
  console.log("Fetching books for author:");
  const result = await axiosConfig.get("/volumes", {
    params: {
      q: `inauthor:${author}`,
      startIndex,
      maxResults,
    },
  });
  console.log("fetchAuthorBooks", result);
  return result.data.items || [];
};
