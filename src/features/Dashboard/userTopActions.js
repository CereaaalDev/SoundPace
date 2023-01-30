import { createAsyncThunk } from "@reduxjs/toolkit";
import { contentAPI } from "../../api/content";
import * as UTILS from "../../util/HelperFunctions";

export const getTracks = createAsyncThunk(
  "userTop/getTracks",
  async (_, {rejectWithValue }) => {
    try {
      const response = await contentAPI.get("/me/top/tracks");
      if (response && response.data) {
        console.log(response.data)
        return response.data;
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

      console.log(fetchIDs)

      const response = await contentAPI.get(`/audio-features?ids=${fetchIDs}`);
      if (response && response.data) {
        console.log(response.data)
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

      return {
        avgTempo: avgTempo,
        avgDanceability: avgDanceability,
        avgEnergy: avgEnergy
      }

    } catch (error) {
      console.log(error);
      return rejectWithValue(error.data);
    }
  }
);

