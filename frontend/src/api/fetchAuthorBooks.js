import googleAxiosConfig from "./googleAxiosConfig";

export const fetchAuthorBooks = async (
  author,
  startIndex = 0,
  maxResults = 12
) => {
  const result = await googleAxiosConfig.get("/volumes", {
    params: {
      q: `inauthor:${author}`,
      startIndex,
      maxResults,
    },
  });
  return result.data.items || [];
};
