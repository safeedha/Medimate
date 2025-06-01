import userInstance from "./instance";

export const geteverymessage = async (reciever:string) => {
  try {
    const response = await userInstance.get("/messages",{
      params:{
        reciever
      }
    });
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}