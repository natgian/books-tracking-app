import axios from "axios";
const apiKey = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const DEFAULT_START_INDEX = 0;
export const DEFAULT_MAX_RESULTS = 12;

const googleAxiosConfig = axios.create({
  baseURL: "https://www.googleapis.com/books/v1",
  params: {
    key: apiKey,
  },
});

export default googleAxiosConfig;
