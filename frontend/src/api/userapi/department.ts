import userInstance from "./instance";

export const getDepartment = async () => {
  try {
    const response = await userInstance.get("/department");
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}

