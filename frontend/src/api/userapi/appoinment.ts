import userInstance from "./instance";
import axios from 'axios'
export const creatAppoinment = async (doctorId:string,slot:string,name:string,email:string,age:number,gender:"male"|"female"|"other",reason:string,amount:number) => {
  try {
    const response = await userInstance.post("/createappoinment",{doctorId, slot, name, email, age, gender, reason,amount})
     console.log(response.data);
    return response.data.message; 
  } catch (error) {
    console.log(error);
  }
}

export const createlockslot=async(slotid:string,doctorid:string)=>
{
    try {
    const response = await userInstance.post("/lockslot",{slotid,doctorid});    
    return response.data.message
  } catch (error) {
    console.log(error)
    if (axios.isAxiosError(error)) {
       console.log(error.response?.data?.message)
        return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }    
      
  }
}

export const getfutureAppoinments = async () => {
  try {
    const response = await userInstance.get('/appointments/future')
   console.log(response.data)
    return response.data 
  } catch (error) {
    console.log(error);
  }
}

export const getpasteAppoinments = async () => {
  try {
    const response = await userInstance.get("/appointments/past");
    console.log(response.data)
    return response.data 
  } catch (error) {
    if (axios.isAxiosError(error)) {
          
        return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}

export const cancelAppoinment=async(appoinmentid:string) => {
  try {
    console.log("hello",appoinmentid)
    const response = await userInstance.patch("/appointment",{appoinmentid});
    console.log(response.data.message)
    return response.data.message
  } catch (error) {
    console.log(error);
  }
}