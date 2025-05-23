import userInstance from "./instance";

export const getAlldoctors = async (singledepartment:string,search:string) => {
  try {
   const response = await userInstance.get("/doctors", {
    params: {
      department: singledepartment,
      search:search
    }
  });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


export const getDepartnment = async () => {
  try {
    const response = await userInstance.get("/department");
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}

export const getSingledoctor = async (id:string) => {
  try {
    const response = await userInstance.get(`/doctor/${id}`);
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}