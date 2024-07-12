import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
  loginUser: "chandu",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    setLoginUser: (state, action) => {
      state.loginUser = action.payload;
    },
    resetLoginForm: () => initialState,
  },
});

export const { setLoginData, resetLoginForm, setLoginUser } =
  loginSlice.actions;
export default loginSlice.reducer;
