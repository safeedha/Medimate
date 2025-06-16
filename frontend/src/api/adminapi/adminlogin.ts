import adminInstance from './instance';

export const adminLogin = async (email: string, password: string) => {
  try {
    const response = await adminInstance.post("/login", { email, password });
    return response.data.message; 
  } catch (error) {
    console.log("hi")
    console.log(error);
   
  }
};

export const Logout= async () => {
  try {
    const response = await adminInstance.get("/logout",);
    return response.data.message; 
  } catch (error) {
    console.log(error);
   
  }
};
