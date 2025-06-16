import adminInstance from './instance';

export const getAllappoinment = async (id: string) => {
  try {

    const response = await adminInstance.get(`/appoinment/doctor/${id}`);
    console.log(id)
   
    return response.data;
  } catch (error) {
    console.log(error);
  }
};


export const getCountforDoc=async()=>{
  try {
    const response = await adminInstance.get(`/appoinment/count`)
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export const gettotalappoinment=async()=>{
    try {
    const response = await adminInstance.get(`/appoinment`)
    return response.data;
  } catch (error) {
    console.log(error);
  }
}


export const getAppointmentsFiltered = async (
  status: 'completed' | 'cancelled' | 'pending',
  start: Date,
  end: Date
) => {
  try {
    const response = await adminInstance.get('/appoinment/filter', {
      params: {
        status,
        start: start.toISOString(), // or format as 'YYYY-MM-DD'
        end: end.toISOString(),
      },
    })
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log('Error fetching filtered appointments:', error);
  }
};
