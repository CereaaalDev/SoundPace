import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userTopReducer from './features/Dashboard/userTopSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    userTop: userTopReducer
  }
})
export default store