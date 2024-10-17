import { useQuery } from "@tanstack/react-query";
import backendAxiosConfig from "../api/backendAxiosConfig";

const fetchReadingLists = async ({ queryKey }) => {
  const userId = queryKey[1];
  const response = await backendAxiosConfig.get(
    `/readinglists/${userId}/books`
  );
  return response.data;
};

export const useReadingLists = (userId) => {
  return useQuery({
    queryKey: ["readingLists", userId], // Include userId in queryKey
    queryFn: fetchReadingLists,
    enabled: !!userId, // Ensure query doesn't run without userId
  });
};
