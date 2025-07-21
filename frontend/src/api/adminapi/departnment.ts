import axiosInstance from "../instances";
import axios from "axios";

export const getDepartment = async (page: number, limit: number, search: string) => {
  try {
    console.log(page, limit, search);
    const response = await axiosInstance.get("/admin/department", {
      params: { page, limit, search },
    });
    return { item: response.data.data, total: response.data.total };
  } catch (error) {
    console.log(error);
  }
};

export const createDepartment = async (deptname: string, description: string) => {
  try {
    const response = await axiosInstance.post("/admin/department", {
      deptname,
      description,
    });
    
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "Internal server error";
    }
  }
};

export const Editdepartnemt = async (id: string, deptname: string, description: string) => {
  try {
    console.log(id, deptname, description);
    const response = await axiosInstance.put(`/admin/department/${id}`, {
      deptname,
      description,
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "Internal server error";
    }
  }
};

export const blockdepartnemt = async (id: string) => {
  try {
    const response = await axiosInstance.patch(`/admin/department/${id}`);
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return "Internal server error";
    }
  }
};
