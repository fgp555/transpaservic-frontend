import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const newState = action.payload;
      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    },

    removeUser: (state) => {
      localStorage.removeItem("user");
      return {};
    },

    toggleAdmin: (state) => {
      const newRole = state.user.role === "admin" ? "user" : "admin";
      state.user.role = newRole; // Actualiza el rol en el estado global
      localStorage.setItem("user", JSON.stringify(state)); // Guarda el estado actualizado
    },
  },
});

export const { setUser, removeUser, toggleAdmin } = userSlice.actions;
export default userSlice;
