import userInstance from "./instance";

export const getAlldoctors = async () => {
  try {
    const response = await userInstance.get("/doctors");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


export const getDepartnment = async () => {
  try {
    const response = await userInstance.get("/department");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}