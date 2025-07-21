import axiosInstance from "../instances";

export const getDepartment = async () => {
  try {
    const response = await axiosInstance.get("/user/department");
    return response.data; 
  } catch (error) {
    console.log(error);
    return 'Failed to fetch departments';
  }
};
