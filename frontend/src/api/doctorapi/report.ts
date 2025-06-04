import doctorInstance from "./instance";
import axios from "axios";




export const AddReport=async(htmlcontent:string,appoinmentId:string,userId:string)=>{
try{
  const response=await doctorInstance.post("/report",{htmlcontent,appoinmentId,userId})
  return response.data
}
catch(error)
{
   if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Internal server error';
  }
}
}