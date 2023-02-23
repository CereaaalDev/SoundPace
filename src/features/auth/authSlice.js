import { createSlice } from "@reduxjs/toolkit";
import { login } from "./authActions";

const initialState = {
  loading: true,
  userInfo: {}, // for user object
  error: null,
  loggedIn: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout (state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token')
      state.loading = false;
      state.userInfo = {}
      state.error = null;
      state.loggedIn = false;
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.userInfo = {
        name: payload.display_name,
        id: payload.id,
        imageURL: payload.images[0].url,
        profileURL: payload.external_urls.spotify,
      };
      state.loggedIn = true;
    },
    [login.rejected]: (state, action) => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token')
      state.error = action.error.message;
      state.loading = false;
      state.loggedIn = false;
    },
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;