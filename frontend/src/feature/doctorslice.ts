import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Idoctor {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  specialisation: string | null;
  experience: number;
  fee: number;
  status: "Approved" | "Rejected" | "Pending";
  isBlocked: boolean;
  googleVerified?: boolean;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
}

interface DoctorState {
  doctorInfo: Idoctor | null;
}

const initialState: DoctorState = {
  doctorInfo: localStorage.getItem("doctorInfo")
    ? JSON.parse(localStorage.getItem("doctorInfo") as string)
    : null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorDetails: (state, action: PayloadAction<Idoctor>) => {
      state.doctorInfo = action.payload;
      localStorage.setItem("doctorInfo", JSON.stringify(action.payload));
    },
    logoutDoctor: (state) => {
      state.doctorInfo = null;
      localStorage.removeItem("doctorInfo");
    },
  },
});

export const { setDoctorDetails, logoutDoctor } = doctorSlice.actions;

export default doctorSlice.reducer;
