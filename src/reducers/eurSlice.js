import { createSlice, current } from "@reduxjs/toolkit";

export const eurSlice = createSlice({
  name: "eur",
  initialState: [],
  reducers: {
    addEURValue: (state, action) => {
        return [action.payload, ...state].slice(0, 20)
    },
  },
});

export const { addEURValue } = eurSlice.actions;

export default eurSlice.reducer;
