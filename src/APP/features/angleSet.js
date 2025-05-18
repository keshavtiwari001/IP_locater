import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   coordinates: {
            lat: null,
            lon: null
        }
}

export const angleSetSlice = createSlice({
  name: 'angleSet',
  initialState,
  reducers: {
    setCoordinates: (state, action) =>{
        state.coordinates = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setCoordinates } = angleSetSlice.actions

export default angleSetSlice.reducer