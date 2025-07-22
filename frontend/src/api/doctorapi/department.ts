import axiosInstance from "../instances";
import type { IDepartment } from '../../Interface/interface';

export const getDepartment = async () => {
  try {
    const response = await axiosInstance.get("/doctor/department/all");
    console.log(response.data);
      const department = response.data.data.map((item: IDepartment) => ({
      id: item._id,
      deptname: item.deptname
    }));
    return department
  } catch (error) {
    console.log(error);
  }
};
