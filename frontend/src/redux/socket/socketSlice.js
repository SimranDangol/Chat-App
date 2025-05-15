import { createSlice } from "@reduxjs/toolkit";

// Create a serializable socket state representation instead of the raw socket object
const socketSlice = createSlice({
  name: "socket",
  initialState: {
    connected: false,
    id: null
  },
  reducers: {
    setSocket: (state, action) => {
      // Store only serializable properties, not the entire socket object
      if (action.payload) {
        state.connected = true;
        state.id = action.payload.id;
      } else {
        state.connected = false;
        state.id = null;
      }
    },
    clearSocket: (state) => {
      state.connected = false;
      state.id = null;
    },
  },
});

export const { setSocket, clearSocket } = socketSlice.actions;

// Create a separate non-redux socket manager to hold the actual socket instance
let socketInstance = null;

export const getSocketInstance = () => socketInstance;

export const setSocketInstance = (socket) => {
  socketInstance = socket;
};

export default socketSlice.reducer;