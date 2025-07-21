import axiosInstance from "../instances";

export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/admin/login", { email, password });
    localStorage.setItem('authToken', response.data.accessToken);
    return response.data.message;
  } catch (error) {
    console.error("Admin login error:", error);
    throw error;
  }
};

export const Logout = async () => {
  try {
    const response = await axiosInstance.get("/admin/logout");
    return response.data.message;
  } catch (error) {
    console.error("Logout error:", error);
    throw error;
  }
};

