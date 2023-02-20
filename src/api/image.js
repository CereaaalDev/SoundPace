import axios from "axios";

const BASE_IMAGE_URL = "https://api.spotify.com/v1";

export const imageAPI = axios.create({
  baseURL: BASE_IMAGE_URL,
  headers: {
    "Content-Type": "image/jpeg",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

