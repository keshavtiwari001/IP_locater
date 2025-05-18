import { configureStore } from '@reduxjs/toolkit'
// import { angleSetSlice } from '../APP/features/angleSet'
import angleSetReducer from '../APP/features/angleSet';

export const store = configureStore({
  reducer: {
    angleSet: angleSetReducer,
  },
})