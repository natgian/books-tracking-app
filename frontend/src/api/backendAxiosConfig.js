import axios from "axios";

const backendURL = process.env.BACKEND_URL;

const backendAxiosConfig = axios.create({
  baseURL: `/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAxiosConfig;
