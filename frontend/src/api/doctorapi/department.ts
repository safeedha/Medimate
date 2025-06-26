import doctorInstance from "./instance";

export const getDepartment = async () => {
  try {
    const response = await doctorInstance.get("/department");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}
