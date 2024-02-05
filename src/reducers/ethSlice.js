import { createSlice, current } from "@reduxjs/toolkit";

export const ethSlice = createSlice({
  name: "eth",
  initialState: [],
  reducers: {
    addETHValue: (state, action) => {
        return [action.payload, ...state].slice(0, 20)
    },
  },
});

export const { addETHValue } = ethSlice.actions;

export default ethSlice.reducer;
