import { createSlice } from "@reduxjs/toolkit";
import { getTracks, getTrackAnalytics, calculateStats } from "./userTopActions";

const initialState = {
  loading: true,
  topTracks: [], // für aktuelle Topptracks
  topArtists: {}, // für aktuelle Topptracks
  stats: {
    avgTempo: "---",
    avgDanceability: "--",
    avgEnergy: "--",
  },
  error: null,
};

const userTopSlice = createSlice({
  name: "userTop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTracks.pending, (state) => {
      state.loading = true;
      state.error = null;
    }),
      builder.addCase(getTracks.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;

        const tracksArray = payload.tracks.items;
        const tracks = tracksArray.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists,
            imageURL: track.album.images[0].url,
          };
        });
        state.topTracks = tracks;
        state.topArtists = payload.artists.items;
      }),
      builder.addCase(getTracks.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.loggedIn = false;
      }),
      builder.addCase(getTrackAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(getTrackAnalytics.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        payload.audio_features.map((track) => {
          //Find IDs in Store and Add new Object there
          state.topTracks.find(
            (prevTrack) => prevTrack.id === track.id
          ).analytics = track;
        });
      }),
      builder.addCase(getTrackAnalytics.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.loggedIn = false;
      }),
      builder.addCase(calculateStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      }),
      builder.addCase(calculateStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.stats = payload;
      }),
      builder.addCase(calculateStats.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
        state.loggedIn = false;
      });
  },
});

export default userTopSlice.reducer;
