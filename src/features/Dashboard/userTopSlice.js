import { createSlice } from "@reduxjs/toolkit";
import { getTracks, getTrackAnalytics, calculateStats } from "./userTopActions";

const initialState = {
  loading: true,
  topTracks: [], // für aktuelle Topptracks
  topArtists: {}, // für aktuelle Topptracks
  stats:{
        avgTempo: '---',
        avgDanceability: '--',
        avgEnergy: '--'
      },
  error: null,
};

const userTopSlice = createSlice({
  name: "userTop",
  initialState,
  reducers:{},
  extraReducers: {
    [getTracks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTracks.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;

      const tracksArray = payload.tracks.items;
        const tracks = tracksArray.map((track) => {
         return {
            id: track.id,
            name: track.name,
            artist: track.artists,
            imageURL: track.album.images[0].url
          };
        });
        state.topTracks = tracks;
        state.topArtists = payload.artists.items;
    },
    [getTracks.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
    [getTrackAnalytics.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },


    [getTrackAnalytics.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      payload.audio_features.map((track) => {

        //Find IDs in Store and Add new Object there
        state.topTracks.find(prevTrack => prevTrack.id === track.id).analytics = track;
      })
    },
    [getTrackAnalytics.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },


    [calculateStats.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [calculateStats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.stats = payload;
    },
    [calculateStats.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
  },
});


export default userTopSlice.reducer;