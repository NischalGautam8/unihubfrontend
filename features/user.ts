import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialstatevalue = {
  username: "",
  firstName: "",
  lastName: "",
  refresh_token: "",
  acess_token: "",
  userid: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialstatevalue },
  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialstatevalue;
    },
  },
});
export const { login } = userSlice.actions;
export default userSlice.reducer;
