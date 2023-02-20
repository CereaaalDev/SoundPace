import axios from "axios";
import { refreshAuthToken } from "./auth";

const BASE_CONTENT_URL = "https://api.spotify.com/v1";

export const imageAPI = axios.create({
  baseURL: BASE_CONTENT_URL,
  headers: {
    "Content-Type": "image/jpeg",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

