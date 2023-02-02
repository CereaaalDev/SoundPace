import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice'
import userTopReducer from './features/Dashboard/userTopSlice'
import paceCreatorReducer from './features/PaceCreator/paceCreatorSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    userTop: userTopReducer,
    paceCreator: paceCreatorReducer
  }
})
export default store