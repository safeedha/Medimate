import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userslice";
import doctorReducer from '../feature/doctorslice';
import tokenReducer from '../feature/tokenslice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    doctor: doctorReducer,
    token:tokenReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
