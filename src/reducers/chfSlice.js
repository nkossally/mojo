import { createSlice, current } from "@reduxjs/toolkit";

export const chfSlice = createSlice({
  name: "chf",
  initialState: [],
  reducers: {
    addCHFValue: (state, action) => {
      console.log("inside chf reducer");
      return [action.payload, ...state].slice(0, 20);
    },
  },
});

export const { addCHFValue } = chfSlice.actions;

export default chfSlice.reducer;
