import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  otherUsers: [], // Added otherUsers to the initial state
  selectedUser: null, /// // Track the currently selected user
  loading: false,
  error: null,
  onlineUsers: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      console.log("signInSuccess called with payload:", action.payload);
      state.currentUser = action.payload.message.user;
      state.loading = false;
      state.error = null;
      state.selectedUser = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOutStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
      state.otherUsers = []; // Clear other users on sign out
      state.loading = false;
      state.error = null;
      state.selectedUser = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // New actions for fetching other users
    OtherUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    OtherUsersSuccess: (state, action) => {
      state.otherUsers = action.payload; // Set fetched users
      state.loading = false;
      state.error = null;
    },
    OtherUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload; // Handle error
    },
    selectUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    deselectUser: (state) => {
      state.selectedUser = null;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

// Export actions
export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
  OtherUsersStart, // New actions for fetching other users
  OtherUsersSuccess,
  OtherUsersFailure,
  selectUser,
  deselectUser,
  setOnlineUsers,
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
