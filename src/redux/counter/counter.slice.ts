import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  value: number
}

const initialState: CounterState = {
  value: 10,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decement: (state) => {
      state.value -= 1;
    }
  },
})

export const { increment, decement } = counterSlice.actions

export default counterSlice.reducer