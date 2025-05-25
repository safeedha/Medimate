import doctorInstance from "./instance";
import axios from 'axios'

type DayOfWeek ='MO' | 'TU' | 'WE' | 'TH' | 'FR' | 'SA' | 'SU';
type frequency="WEEKLY"|"DAILY"
export const createAppoinment=async(startDate:string,endDate:string,selectedDays:DayOfWeek[],startTime:string,endTime:string,interval:number,frequency:frequency)=>{
  try{
     const response=await doctorInstance.post("/slot/recurring",{startDate,endDate,selectedDays,startTime,endTime,interval,frequency})
      return response.data.message
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }

}

export const getrecurring=async(id:string)=>{
  try{
     const response=await doctorInstance.get(`/slots/recurring/${id}`)
     console.log(response)
      return response.data.result
  }
  catch(error)
  {
    if (axios.isAxiosError(error)) {
      console.log(error)
      return error.response?.data?.message || error.message;
    } else {
      console.error(error);
    }
  }

}