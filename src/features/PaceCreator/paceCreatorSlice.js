import { createSlice } from "@reduxjs/toolkit";
import {
  getPlaylists,
  getTracksOfSelectedPlaylists,
  getAnalyticsOfSelectedTracks,
  createPlaylist,
} from "./paceCreatorActions";

const initialState = {
  loading: true,
  userPlaylists: [], // Playlist des Users
  userLibrary: [], // Library des Users
  selectedTracks: [],
  filteredTracks: [],
  createPlaylistSuccessfull: null,
  currentStep: 1,
  error: null,
};

const paceCreatorSlice = createSlice({
  name: "paceCreator",
  initialState,
  reducers: {
    selectPlaylist(state, { payload }) {
      let index = state.userPlaylists.findIndex((pl) => pl.id === payload);
      state.userPlaylists[index].selected =
        !state.userPlaylists[index].selected;
    },
    nextStep(state) {
     state.currentStep = state.currentStep + 1;
    },
    previousStep(state) {
     state.currentStep = state.currentStep - 1;
    },
    addFilteredTracks(state, {payload}){
      state.filteredTracks = payload;
    },
    restart(state){
      state.selectedTracks = [];
      state.filteredTracks = [];
      state.userPlaylists = [];
      state.currentStep = 1;
    },
    resetSuccess(state) {
      state.createPlaylistSuccessfull = null;
    }
  },
  extraReducers: {
    [getPlaylists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getPlaylists.fulfilled]: (state, { payload }) => {
      if (payload.next === null) {
        state.loading = false;
      }
      state.error = null;
      state.userPlaylists = state.userPlaylists.concat(payload.items);
    },
    [getPlaylists.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getTracksOfSelectedPlaylists.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getTracksOfSelectedPlaylists.fulfilled]: (state, { payload }) => {
      state.selectedTracks = payload;
      state.loading = false;
      state.error = null;
    },
    [getTracksOfSelectedPlaylists.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [getAnalyticsOfSelectedTracks.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAnalyticsOfSelectedTracks.fulfilled]: (state, { payload }) => {
      payload.forEach((element) => {
        //Prüfung ob element nicht null ist (kann vorkommen wenn zu einem Song noch keine Analytics da sind)
        if (!element) {
          return;
        }
        let index = state.selectedTracks.findIndex(
          (track) => track.track.id === element.id
        );
        state.selectedTracks[index].analytics = element;
      });
      state.loading = false;
      state.error = null;
    },
    [getAnalyticsOfSelectedTracks.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
    [createPlaylist.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [createPlaylist.fulfilled]: (state, { payload }) => {
      state.error = null;
      state.loading = false;
      state.createPlaylistSuccessfull = true;
    },
    [createPlaylist.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    }
  },
});

export const { selectPlaylist, nextStep, previousStep, addFilteredTracks, restart, resetSuccess } = paceCreatorSlice.actions;
export default paceCreatorSlice.reducer;
