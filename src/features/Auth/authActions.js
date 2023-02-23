import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthToken } from "/src/api/auth";
import { contentAPI } from "/src/api/content";

export const login = createAsyncThunk(
  "auth/login",
  async (code, { rejectWithValue }) => {
    try {
      if (code) {
        await getAuthToken(code);
      }
      const response = await contentAPI.get("/me");

      if(response && response.data){
        return response.data;
      }
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.data);
    }
  }
);
