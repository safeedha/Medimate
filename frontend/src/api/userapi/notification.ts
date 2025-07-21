import axiosInstance from "../instances";

export const getunreadnotification = async () => {
  try {
    const response = await axiosInstance.get("/user/notification");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
    return 'Failed to fetch departments';
  }
};

export const readallnotification= async () => {
  try {
    const response = await axiosInstance.patch("/user/notification");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
    return 'Failed to fetch departments';
  }
};

