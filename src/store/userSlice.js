import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("user")) || {
  login: false,
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    whatsapp: null,
    username: null,
    image: null,
    role: null,
    createdAt: null,
    operator: { name: null },
  },
  token: null,
};

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

    toggleRole: (state) => {
      const newRole = state.user.role === "admin" ? "user" : "admin";
      state.user.role = newRole; // Actualiza el rol en el estado global
      localStorage.setItem("user", JSON.stringify(state)); // Guarda el estado actualizado
    },
  },
});

export const { setUser, removeUser, toggleRole } = userSlice.actions;
export default userSlice;

/*  
  const userSlice = useSelector((state) => state.user);
  const isAdmin = useSelector((state) => state.user?.user?.role === "admin");
  const isLogin = useSelector((state) => state.user?.login);
  const userToken = useSelector((state) => state.user?.token);
*/
