import { createSlice} from "@reduxjs/toolkit";
import type  {PayloadAction } from "@reduxjs/toolkit"

interface tokenState{
    doctortoken:string,
    adminttoken:string,
    usertoken:string,
}

const initialState:tokenState={
    doctortoken:"",
    adminttoken:"",
    usertoken:"",
}

const tokenSlice=createSlice({
    name:'token',
    initialState,
    reducers:{
        adddoctortoken(state,action:PayloadAction<{token:string}>){
                state.doctortoken=action.payload.token
        },
        addusertoken(state,action:PayloadAction<{token:string}>){
                state.usertoken=action.payload.token
        },
        addadmintoken(state,action:PayloadAction<{token:string}>){
                state.adminttoken=action.payload.token
        }
    }

})

export const { adddoctortoken,addusertoken,addadmintoken} = tokenSlice.actions;
export default tokenSlice.reducer;