import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";

const fetchReadingLists = async () => {
  const response = await backendAxiosConfig.get(`/readinglists/books`);
  return response.data;
};

export const useReadingLists = () => {
  return useQuery({
    queryKey: ["readingLists"], // Include userId in queryKey
    queryFn: fetchReadingLists,
  });
};
