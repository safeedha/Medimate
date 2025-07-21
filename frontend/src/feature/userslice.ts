
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UserInfo{
  _id?:string,
  firstname:string,
  lastname:string,
  email?:string,
}

interface UserState {
  userInfo: UserInfo | null;
}


const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
};




const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setUserDetails, logoutUser } = userSlice.actions;

export default userSlice.reducer;
