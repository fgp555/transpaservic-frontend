import { createSlice } from "@reduxjs/toolkit";

// Leer el tema inicial desde localStorage o usar "light" como valor por defecto.
const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme); // Actualizar el tema en localStorage
    },
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme); // Guardar el nuevo tema en localStorage
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice;
