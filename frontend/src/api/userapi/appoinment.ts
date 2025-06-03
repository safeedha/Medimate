import userInstance from "./instance";

export const creatAppoinment = async (doctorId:string,slot:string,name:string,email:string,age:number,gender:"male"|"female"|"other",reason:string,amount:number) => {
  try {
    const response = await userInstance.post("/createappoinment",{doctorId, slot, name, email, age, gender, reason,amount})
     console.log(response.data);
    return response.data.message; 
  } catch (error) {
    console.log(error);
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
    console.log(error);
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