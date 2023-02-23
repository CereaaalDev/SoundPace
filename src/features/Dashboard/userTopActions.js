import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentAPI } from "/src/api/content";
import * as UTILS from "/src/util/HelperFunctions";

export const getTracks = createAsyncThunk(
  "userTop/getTracks",
  async (timeRange, {rejectWithValue }) => {
    try {
      const responseTracks = await contentAPI.get(`/me/top/tracks?time_range=${timeRange}`);
      const responseArtists = await contentAPI.get(`/me/top/artists?time_range=${timeRange}`);
      if (responseTracks && responseTracks.data && responseArtists && responseArtists.data) {
        return {tracks: responseTracks.data, artists: responseArtists.data}
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

export const getTrackAnalytics = createAsyncThunk(
  "userTop/getTrackAnalytics",
  async (_, { getState, rejectWithValue }) => {
    try {
      const topTracks = getState().userTop.topTracks;
      const fetchIDs = topTracks.map(track => track.id).join(',')
      const response = await contentAPI.get(`/audio-features?ids=${fetchIDs}`);
      if (response && response.data) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);


export const calculateStats = createAsyncThunk(
  "userTop/calculateStats",
  async (_, {getState, rejectWithValue }) => {
    try {
      const analyticsData = getState().userTop.topTracks.map(track => track.analytics);

      const tempo = analyticsData.map(track => track.tempo);
      const avgTempo = Math.round(UTILS.calculateAverage(tempo));

      const danceability = analyticsData.map(track => track.danceability);
      const avgDanceability = Math.round(UTILS.calculateAverage(danceability)*100);
      
      const energy = analyticsData.map(track => track.energy);
      const avgEnergy = Math.round(UTILS.calculateAverage(energy)*100);

      const topArtists = getState().userTop.topArtists
      const hipsterIndex = 100-Math.round(UTILS.calculateAverage(topArtists.map(artist => artist.popularity)));

      return {
        avgTempo: avgTempo,
        avgDanceability: avgDanceability,
        avgEnergy: avgEnergy,
        hipsterIndex: hipsterIndex
      }

    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

