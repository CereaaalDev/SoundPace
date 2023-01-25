import axios from "axios";
import { refreshAuthToken } from "./auth";

const BASE_CONTENT_URL = 'https://api.spotify.com/v1';

export const contentAPI = axios.create({
    baseURL: BASE_CONTENT_URL,
    headers: {
        "Content-Type": "application/json",
      }
  });


  // Interceptor um jedem Aufruf das aktuelle Token mitzugeben
contentAPI.interceptors.request.use(
    async config => {
      config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      }
      return config;
    },
    error => {
      Promise.reject(error)
  });


  //Interceptor um Token zu erneuern, falls abgelaufen 
  contentAPI.interceptors.response.use((response) => {
    return response
  }, async function (error) {
    const originalRequest = error.config;

    console.log(error.response.status)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshAuthToken();     
      return contentAPI(originalRequest);
    }
    return Promise.reject(error);
  });

  export const testRequest = async () => {
    try{
        //const response = await contentAPI.get("/audio-features/2czpGtNhPPVEh6hfedLpyT")
        const response = await contentAPI.get("/me")
        console.log(response);
    }catch(error){
        console.log('Der nächste ist von hier:')
        console.error(error);
        return Promise.reject('no promise');
    }
  }







  

