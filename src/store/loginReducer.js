import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "login",
  initialState: false,
  reducers: {
    setIsLoggedin: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsLoggedin } = loginSlice.actions;
export default loginSlice.reducer;