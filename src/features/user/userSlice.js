import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("userData"));

const initialState = storedUser || {
  user: null,
  isLoggedIn: false,
  token: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          user: state.user,
          isLoggedIn: state.isLoggedIn,
          token: state.token
        })
      );
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
      state.token = null;

      localStorage.removeItem("userData");
    },
    updateTask(state, action) {
      if (state.user) {
        state.user.tasks = action.payload;
        console.log(state.user);

        localStorage.setItem(
          "userData",
          JSON.stringify({
            user: state.user,
            isLoggedIn: state.isLoggedIn,
            token: state.token
          })
        );
      }
    }
  }
});

export const { login, logout, updateTask } = userSlice.actions;
export default userSlice.reducer;
