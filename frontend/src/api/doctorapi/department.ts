import doctorInstance from "./instance";

export const getDepartment = async () => {
  try {
    const response = await doctorInstance.get("/department");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}
