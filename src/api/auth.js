import axios from "axios";
import * as Utils from "../util/HelperFunctions";

const BASE_AUTH_URL = "https://accounts.spotify.com";
const CLIENT_ID = "9e015ecfbd974c18a74316be13330671";
const REDIRECT_URL = "http://localhost:5173/afterLogin";

const authAPI = axios.create({
  baseURL: BASE_AUTH_URL,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export const getLoginUrl = () => {
  // Generate code_verifier and safe it in local store
  const code_verifier = Utils.generateRandomString(50);
  localStorage.setItem("code_verifier", code_verifier);

  //encrypt  code Verifier
  const code_challenge = Utils.getEncodedVerifier(code_verifier);

  //create URL
  const url = `${BASE_AUTH_URL}/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}&code_challenge_method=S256&code_challenge=${code_challenge}`;
  return url;
};

export const getAuthToken = async (code) => {
  try {
    const code_verifier = localStorage.getItem("code_verifier");
    if (!code_verifier) {
      console.log("Code Verifier exisitert nicht");
      throw new Error("Code Verifier existiert nicht");
    }

    const response = await authAPI.post("/api/token", null, {
      params: {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: REDIRECT_URL,
        client_id: CLIENT_ID,
        code_verifier: code_verifier,
      },
    });

    if (response.status === 200) {
      localStorage.setItem("access_token", response.data.access_token);
      localStorage.setItem("refresh_token", response.data.refresh_token);
      localStorage.removeItem("code_verifier");
    }
  } catch (error) {
    localStorage.removeItem("code_verifier");
    if (error.response) {
      //Request made but the server responded with an error
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      console.log("Error.response Fehler");
      return Promise.reject(error.response);
      //throw new Error(error.response)
    } else if (error.request) {
      // Request made but no response is received from the server.
      //console.log(error.request);
      console.log("Error.request fehler");
      return Promise.reject(error.request);
    } else {
      // Error occured while setting up the request
      //console.log("Error", error.message);
      console.log("genereller Error");
      return Promise.reject(error.message);
    }
  }
};

export const refreshAuthToken = async () => {
    try{
        const refresh_token = localStorage.getItem('refresh_token');
        if(!refresh_token){
            throw new Error('Es ist kein refresh_token mehr im Store --> neues Login nötig')
        }

        const response = await authAPI.post("/api/token", null, {
            params: {
              grant_type: "refresh_token",
              refresh_token: refresh_token,
              client_id: CLIENT_ID,
            }
        })
        
        console.log(response);
        if(response.status === 200){
            localStorage.setItem("access_token", response.data.access_token);
            if(response.data.refresh_token){
                localStorage.setItem("refresh_token", response.data.refresh_token);
            }
        }else{
            throw new Error('Response error');
        }

    }catch(error) {
        console.error(error);
        return Promise.reject();
    }
};
