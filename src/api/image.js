import axios from "axios";

export const imageAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_CONTENT_URL,
  headers: {
    "Content-Type": "image/jpeg",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

// Interceptor um jedem Aufruf das aktuelle Token mitzugeben
imageAPI.interceptors.request.use(
    async config => {
      config.headers = {
        "Content-Type": "image/jpeg",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });

//Interceptor um Token zu erneuern, falls abgelaufen 
imageAPI.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;

    console.log(error.response.status)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAuthToken();     
      return imageAPI(originalRequest);
    }
    return Promise.reject(error);
  });
