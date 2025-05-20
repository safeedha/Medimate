import adminInstance from './instance';
import axios from "axios";
export const getDepartment = async () => {
  try {
    const response = await adminInstance.get("/department");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
};


export const createDepartment = async (deptname: string, description: string) => {
  try {
    const response = await adminInstance.post("/department", { deptname, description });
    return { success: true, data: response.data };
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as any).response?.data?.message
    ) {
      return {
        success: false,
        message: (error as any).response.data.message,
      };
    } else {
      return { success: false, message: "Something went wrong." };
    }
  }
};


export const Editdepartnemt = async (id:string,deptname: string, description: string) => {
  try {
    console.log(id,deptname,description)
    const response = await adminInstance.put(`/department/${id}`, { deptname, description });
  return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Internal server error';
  }
  }
};


export const blockdepartnemt = async (id:string) => {
  try {

    const response = await adminInstance.patch(`/department/${id}`);
  return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
    console.log(error.response?.data?.message);
    return error.response?.data?.message || error.message;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return 'Internal server error';
  }
  }
};