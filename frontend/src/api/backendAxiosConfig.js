import axios from "axios";

const backendURL = import.meta.env.VITE_BACKEND_URL;

const backendAxiosConfig = axios.create({
  baseURL: `${backendURL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // withCredentials: true is required to send cookies with cross-origin requests (sessions
});

export default backendAxiosConfig;
