import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  token: "",
};

const loadFromLocalStorage = () => {
  const savedState = localStorage.getItem("user");
  return savedState ? JSON.parse(savedState) : initialState;
};

const userSlice = createSlice({
  name: "user",
  initialState: loadFromLocalStorage(),
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      localStorage.setItem("user", JSON.stringify(state));
    },
    clearUser: (state) => {
      state.username = "";
      state.token = "";
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
