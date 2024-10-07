import googleAxiosConfig from "./googleAxiosConfig";

export const fetchSingleBook = async (id) => {
  const result = await googleAxiosConfig.get(`/volumes/${id}`);
  return result.data;
};
