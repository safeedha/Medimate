import axiosInstance from "../instances";

export const getDepartment = async () => {
  try {
    const response = await axiosInstance.get("/doctor/department");
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.log(error);
  }
};
