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

export const getallappoinment=async()=>{
  try{
    const response=await doctorInstance.get('/doctor/appoinment')
     return response.data.appoi
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

export const changerecurringslotStatus=async(id:string)=>{
  try{
    console.log(id)
        const response=await doctorInstance.delete(`/slots/recurring/${id}`)
        return response.data.messgae
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


export const cancelAppoinment=async(id:string,reason:string,userid:string,email:string)=>{
  try{
  
        const response=await doctorInstance.patch(`/doctor/appoinment/${id}/${userid}`,{reason,email})
        console.log(response)
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



export const  getSlotedoctor=async(date:Date)=>{
  try {
    const response = await doctorInstance.get('/slots', {
      params: { date: date }
    });
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


export const editSlot=async(id:string)=>{
  try{
  
        const response=await doctorInstance.put(`/slots/${id}`)
        console.log(response)
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

export const cancelSlot=async(slotid:string)=>{
  try{
  
        const response=await doctorInstance.delete(`/slots/${slotid}`)
        console.log(response)
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