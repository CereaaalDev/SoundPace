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

export const getPLTrackIDs = createAsyncThunk(
  "paceCreator/getPLTrackIDs",
  async (url, { dispatch, rejectWithValue }) => {
    try {
      let responsePlaylist = "";

      if (!url) {
        responsePlaylist = await contentAPI.get(
          `/playlists/37i9dQZF1F0sijgNaJdgit/tracks?limit=50`
        );
      } else {
        responsePlaylist = await contentAPI.get(url);
      }

      console.log(responsePlaylist.data);

      if (responsePlaylist.data.next) {
        dispatch(getPLTrackIDs(responsePlaylist.data.next));
      }

      return responsePlaylist.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const getTrackAnalytics = createAsyncThunk(
  "paceCreator/getTrackAnalytics",
  async (ids, { dispatch, rejectWithValue }) => {
    try {
      let responsePlaylist = await contentAPI.get(`/audio-features?ids=${ids}`);

      console.log(responsePlaylist.data);

      return responsePlaylist.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const playlistBatch = createAsyncThunk(
  "paceCreator/playlistBatch",
  async (ids, { getState, dispatch, rejectWithValue }) => {
    try {
      let selectedPlaylists = getState().paceCreator.userPlaylists.filter(playlist => playlist.selected);
      selectedPlaylists.forEach((playlist)=> {
        dispatch(getPLTrackIDs(playlist.tracks.href));
    });



    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);
