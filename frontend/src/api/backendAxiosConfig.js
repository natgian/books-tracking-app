import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const backendAxiosConfig = axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default backendAxiosConfig;
