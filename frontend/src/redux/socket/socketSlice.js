
import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: null,
  reducers: {
    setSocket: (state, action) => action.payload,
    clearSocket: () => null,
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;
export default socketSlice.reducer;
