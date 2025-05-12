import adminInstance from './instance';

export const adminLogin = async (email: string, password: string) => {
  try {
    console.log("hello")
    const response = await adminInstance.post("/login", { email, password });
    return response.data.message; 
  } catch (error) {
    console.log("hi")
    console.log(error);
   
  }
};
