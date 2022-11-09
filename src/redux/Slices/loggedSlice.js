import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const loggedSlice = createSlice({
  name: "isLogged",
  initialState,
  reducers: {
    logIn(_, action) {
      return action.payload;
    },
  },
});

export const { logIn } = loggedSlice.actions;
export default loggedSlice.reducer;
