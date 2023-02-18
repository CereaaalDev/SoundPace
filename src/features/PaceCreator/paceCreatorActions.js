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

export const getTracksOfSelectedPlaylists = createAsyncThunk(
  "paceCreator/getTracksOfSelectedPlaylists",
  async (id, { getState, rejectWithValue }) => {
    try {
      let selectedPlaylists = getState().paceCreator.userPlaylists.filter(
        (playlist) => playlist.selected
      );
      let response = null;
      let result = [];

      for (const playlist of selectedPlaylists) {
        response = await contentAPI.get(`/playlists/${playlist.id}/tracks`);
        result = result.concat(response.data.items);

        // Iterative API Abfrage um alle Elemente abzufragen
        while (response.data.next) {
          response = await contentAPI.get(response.data.next);
          result = result.concat(response.data.items);
        }
      }
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const getAnalyticsOfSelectedTracks = createAsyncThunk(
  "paceCreator/getAnalyticsOfSelectedTracks",
  async (id, { getState, rejectWithValue }) => {
    try {
      let trackIds = getState().paceCreator.selectedTracks.map(
        (track) => track.track.id
      );

      let response = null;
      let result = [];

      //100 TrackIds aus Array zu einem einzelnen String für Request vorbereiten
      while (trackIds.length > 0) {
        const chunk = trackIds.splice(0, 100).join();
        response = await contentAPI.get(`/audio-features?ids=${chunk}`);
        result = result.concat(response.data.audio_features);
      }
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);
