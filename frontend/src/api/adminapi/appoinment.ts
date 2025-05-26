import adminInstance from './instance';

export const getAllappoinment = async (id: string) => {
  try {
    console.log("hello")
    const response = await adminInstance.get(`/appoinment/doctor/${id}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
