import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  password: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginData: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    resetLoginForm: () => initialState,
  },
});

export const { setLoginData, resetLoginForm } = loginSlice.actions;
export default loginSlice.reducer;
