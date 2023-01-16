import { createSlice } from '@reduxjs/toolkit'
import {  login } from './authActions'

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state) => {
        state.loading = true; 
    },
    [login.fulfilled]: (state, action) => {
        state.success = true;
        state.loading = false;
        state.newSuccess = action.payload.success;
    },
    [login.rejected]: (state) => {
        state.error = true;
        state.loading = false; 
    }
  },
})

export default authSlice.reducer