import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenIsValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    isValid: (state) => {
      state.tokenIsValid = true;
    },
    noValid: (state) => {
      state.tokenIsValid = false;
    },
  },
});

export const { isValid, noValid } = authSlice.actions;
export default authSlice.reducer;
