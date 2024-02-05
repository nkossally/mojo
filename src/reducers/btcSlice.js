import { createSlice, current } from "@reduxjs/toolkit";

export const btcSlice = createSlice({
  name: "btc",
  initialState: [],
  reducers: {
    addBTCValue: (state, action) => {
        return [action.payload, ...state].slice(0, 20)
    },
  },
});

export const { addBTCValue } = btcSlice.actions;

export default btcSlice.reducer;
