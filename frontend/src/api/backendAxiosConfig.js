import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const backendAxiosConfig = axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAxiosConfig;
