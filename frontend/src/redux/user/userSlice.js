import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  otherUsers: [], 
  selectedUser: null, 
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
      state.otherUsers = [];
      state.loading = false;
      state.error = null;
      state.selectedUser = null;
    },
    signOutFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    OtherUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    OtherUsersSuccess: (state, action) => {
      state.otherUsers = action.payload;
      state.loading = false;
      state.error = null;
    },
    OtherUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
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
  OtherUsersStart,
  OtherUsersSuccess,
  OtherUsersFailure,
  selectUser,
  deselectUser,
  setOnlineUsers,
} = userSlice.actions;

export default userSlice.reducer;
