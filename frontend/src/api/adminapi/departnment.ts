import adminInstance from './instance';

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