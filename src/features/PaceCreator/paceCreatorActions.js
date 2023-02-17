import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentAPI } from "../../api/content";

export const getPlaylists = createAsyncThunk(
  "paceCreator/getPlaylists",
  async (url, { dispatch, rejectWithValue }) => {
    try {
      let responsePlaylist = "";

      if (!url) {
        responsePlaylist = await contentAPI.get(`/me/playlists?limit=50`);
      } else {
        responsePlaylist = await contentAPI.get(url);
      }

      console.log(responsePlaylist.data);

      if (responsePlaylist.data.next) {
        dispatch(getPlaylists(responsePlaylist.data.next));
      }

      return responsePlaylist.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);
