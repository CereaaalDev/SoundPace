import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentAPI } from "/src/api/content";
import { B64_COVER } from "/src/assets/cover_b64_plain.js";
import { imageAPI } from "/src/api/image";

export const getPlaylists = createAsyncThunk(
  "paceCreator/getPlaylists",
  async (_, { rejectWithValue }) => {
    try {
      let response = null;
      let result = [];

      response = await contentAPI.get(`/me/playlists?limit=50`);
      result = result.concat(response.data.items);

      while (response.data.next) {
        response = await contentAPI.get(response.data.next);
        result = result.concat(response.data.items);
      }
      return result;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const getTracksOfSelectedPlaylists = createAsyncThunk(
  "paceCreator/getTracksOfSelectedPlaylists",
  async (_, { getState, rejectWithValue }) => {
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
  async (_, { getState, rejectWithValue }) => {
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

export const createPlaylist = createAsyncThunk(
  "paceCreator/createPlaylist",
  async (playlistName, { getState, dispatch, rejectWithValue }) => {
    try {
      const user_id = getState().auth.userInfo.id;
      const createRequest = await contentAPI.post(
        `/users/${user_id}/playlists`,
        {
          name: playlistName,
          description:
            "Playlist wurde mit SoundPace erstellt. Mehr Infos unter mysoundpace.com",
          public: false,
        }
      );

      const trackURIs = getState().paceCreator.filteredTracks.map(
        (track) => track.track.uri
      );

      if (!createRequest.data.id) {
        console.log("keine Playlist ID erhalten");
        return;
      }

      while (trackURIs.length > 0) {
        const chunk = trackURIs.splice(0, 100);
        const addRequest = await contentAPI.post(
          `/playlists/${createRequest.data.id}/tracks`,
          {
            uris: chunk,
          }
        );
      }

      dispatch(changePlaylistCover(createRequest.data.id));
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const changePlaylistCover = createAsyncThunk(
  "paceCreator/changePlaylistCover",
  async (id, { rejectWithValue }) => {
    try {
      //Timeout damit Playlist wirklich angelegt ist bei Spotify
      const sleep = (milliseconds) =>
        new Promise((resolve) => setTimeout(resolve, milliseconds));
      await sleep(2000);
      await imageAPI.put(`/playlists/${id}/images`, B64_COVER);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);
