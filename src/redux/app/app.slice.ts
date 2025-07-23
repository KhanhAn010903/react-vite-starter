import { createSlice } from '@reduxjs/toolkit'

const initialState: {
  mode: string;
} = {
  mode: 'light'
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    changeMode(state, action) {
      state.mode = action.payload
    }
  },
})

export const { changeMode } = AppSlice.actions

export default AppSlice.reducer