import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return action.payload;
    },

    removeUser: (state) => {
      localStorage.removeItem("user");
      return {};
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice;
