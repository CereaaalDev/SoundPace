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
    selectAllPlaylists(state) {
      state.userPlaylists.forEach((playlist) => (playlist.selected = true));
    },
    deselectAllPlaylists(state) {
      state.userPlaylists.forEach((playlist) => (playlist.selected = false));
    },
    nextStep(state) {
      state.currentStep = state.currentStep + 1;
    },
    previousStep(state) {
      state.currentStep = state.currentStep - 1;
    },
    addFilteredTracks(state, { payload }) {
      state.filteredTracks = payload;
    },
    restart(state) {
      state.selectedTracks = [];
      state.filteredTracks = [];
      state.userPlaylists = [];
      state.currentStep = 1;
    },
    resetSuccess(state) {
      state.createPlaylistSuccessfull = null;
    },
    removeFilteredTrack(state, { payload }) {
      const index = state.filteredTracks.findIndex(
        (element) => element.track.id === payload
      );
      state.filteredTracks.splice(index, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPlaylists.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(getPlaylists.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.userPlaylists = payload;
      }),
      builder.addCase(getPlaylists.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      }),
      builder.addCase(getTracksOfSelectedPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        getTracksOfSelectedPlaylists.fulfilled,
        (state, { payload }) => {
          state.selectedTracks = payload;
          state.loading = false;
          state.error = null;
        }
      ),
      builder.addCase(
        getTracksOfSelectedPlaylists.rejected,
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
        }
      ),
      builder.addCase(getAnalyticsOfSelectedTracks.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(
        getAnalyticsOfSelectedTracks.fulfilled,
        (state, { payload }) => {
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
        }
      ),
      builder.addCase(
        getAnalyticsOfSelectedTracks.rejected,
        (state, action) => {
          state.error = action.error.message;
          state.loading = false;
          state.loggedIn = false;
        }
      ),
      builder.addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(createPlaylist.fulfilled, (state) => {
        state.error = null;
        state.loading = false;
        state.createPlaylistSuccessfull = true;
      }),
      builder.addCase(createPlaylist.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export const {
  selectPlaylist,
  nextStep,
  previousStep,
  addFilteredTracks,
  restart,
  resetSuccess,
  selectAllPlaylists,
  deselectAllPlaylists,
  removeFilteredTrack,
} = paceCreatorSlice.actions;
export default paceCreatorSlice.reducer;
