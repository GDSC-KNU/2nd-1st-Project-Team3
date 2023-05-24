import { createSlice } from "@reduxjs/toolkit";

const watched = createSlice({
  name: "watched",
  initialState: { watched: false, account: "", contentId: "", mediaType: "" },
  reducers: {
    isWatched(state) {
      state.watched = !state.watched;
    },
  },
});
export const { isWatched } = watched.actions;
export default watched.reducer;
