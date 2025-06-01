import doctorInstance from "./instance";
import axios from "axios";

export const getAlluser = async () => {
  try {
    const response = await doctorInstance.get("/user");
    console.log(response)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}
