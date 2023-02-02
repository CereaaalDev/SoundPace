import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  userPlaylist: [], // Playlist des Users
  userLibrary: [], // Library des Users
  error: null,
};

const paceCreatorSlice = createSlice({
  name: "paceCreator",
  initialState,
  reducers:{},
  extraReducers: {

  },
});


export default paceCreatorSlice.reducer;