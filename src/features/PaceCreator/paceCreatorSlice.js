import { createSlice } from "@reduxjs/toolkit";
import { getPlaylists, getPLTrackIDs, getTrackAnalytics, playlistBatch } from "./paceCreatorActions";

const initialState = {
  loading: true,
  userPlaylists: [], // Playlist des Users
  userLibrary: [], // Library des Users
  selectedPlaylists: [],
  selectedTracks: [],
  error: null,
};

const paceCreatorSlice = createSlice({
  name: "paceCreator",
  initialState,
  reducers:{
    selectPlaylist (state, {payload}) {
      state.selectedPlaylists.push(payload)
      let index = state.userPlaylists.findIndex(pl => pl.id === payload)
      state.userPlaylists[index].selected = !state.userPlaylists[index].selected
    }
  },
  extraReducers: {
    [getPlaylists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPlaylists.fulfilled]: (state, { payload }) => {
      if(payload.next === null){
        state.loading = false;
      }
      state.error = null;     
      state.userPlaylists = state.userPlaylists.concat(payload.items);
    },
    [getPlaylists.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
    [getPLTrackIDs.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPLTrackIDs.fulfilled]: (state, { payload }) => {
      if(payload.next === null){
        state.loading = false;
      }
      state.selectedTracks = state.selectedTracks.concat(payload.items);
      state.error = null;
    },
    [getPLTrackIDs.rejected]: (state, action) => {
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

      //audio features zu den Tracks zuordnen
      payload.audio_features.forEach(element => {
        let index = state.selectedTracks.findIndex(track => track.track.id === element.id);
        state.selectedTracks[index].analytics = element;
      });
      state.error = null;
    },
    [getTrackAnalytics.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
    [playlistBatch.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [playlistBatch.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
    },
    [playlistBatch.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
  },
});

export const {selectPlaylist} = paceCreatorSlice.actions;
export default paceCreatorSlice.reducer;