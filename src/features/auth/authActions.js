import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "../../api/auth";

export const login = createAsyncThunk(
  'auth/login',
  async (code, { rejectWithValue }) => {
    try{
      await getAuthToken(code);
      return {success: true}
    }catch(error){
      if(error.data){
        return rejectWithValue(error.data)
      }
      return rejectWithValue(error);
    }
  }
)

// export const getAuth = createAsyncThunk(
//   "auth/getAuth",
//   async ({ code, code_verifier }, { rejectWithValue }) => {
//     try {
//       const response = await authAPI.post("/api/token", null, {
//         params: {
//           grant_type: "authorization_code",
//           code: code,
//           redirect_uri: REDIRECT_URL,
//           client_id: CLIENT_ID,
//           code_verifier: localStorage.getItem('code_verifier'),
//         },
//       });
//       localStorage.removeItem('code_verifier')
//       return response.data;
//     } catch (error) {
//       if (error.response) {
//         //Request made but the server responded with an error
//         return rejectWithValue(error.response.data);
//       } else if (error.request) {
//         // Request made but no response is received from the server.
//         return rejectWithValue(error.request);
//       } else {
//         // Error occured while setting up the request
//         return rejectWithValue("Error", error.message);
//       }
//     }
//   }
// );

const refreshAuthToken = async () => {};
