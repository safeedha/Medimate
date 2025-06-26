import userInstance from "./instance";
import axios from "axios";

export const createReview=async(comment:string,rating:number,doctorId:string)=>{
  try{
    const response=await userInstance.post('/review',{comment,rating,doctorId})
    console.log(response)
    return response.data
  }
  catch(error)
  {
     if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }
}

export const getReview=async(doctorId:string,page:number,limit:number)=>{
  try{
    const response=await userInstance.get('/review',{
      params:{
        doctorId,
        page,
        limit
      }
    })
    console.log(response)
    return response.data
  }
    catch(error)
  {
     if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }  
} 



export const getAverage=async(doctorId:string)=>{
    try{
    const response=await userInstance.get('/review/count',{params:{ doctorId}})
    return response.data
  }
    catch(error)
  {
     if (axios.isAxiosError(error)) {
          
          return error.response?.data?.message || error.message;
        } else {
          console.error(error);
        }
  }  
}
