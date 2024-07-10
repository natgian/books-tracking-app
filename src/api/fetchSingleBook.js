import axiosConfig from "./axiosConfig";

export const fetchSingleBook = async (id) => {
  const result = await axiosConfig.get(`/volumes/${id}`);
  return result.data;
};
