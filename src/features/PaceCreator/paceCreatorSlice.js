import { createSlice } from "@reduxjs/toolkit";
import { getPlaylists } from "./paceCreatorActions";

const initialState = {
  loading: true,
  userPlaylists: [], // Playlist des Users
  userLibrary: [], // Library des Users
  selectedPlaylists: [],
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
  },
});

export const {selectPlaylist} = paceCreatorSlice.actions;
export default paceCreatorSlice.reducer;