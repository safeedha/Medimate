import axios from 'axios'
import adminInstance from './instance';

export const walletInformation=async(page:number,limit:number)=>{
  try{
    const response = await adminInstance.get(`/wallet`,{params:{page,limit}});
    console.log(response.data)
     return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const refundInformation=async()=>{
  try{
    const response = await adminInstance.get(`/wallet/refund`);

    return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data.message);
      return error.response?.data?.message || error.message;
    }
  }
}


export const payoutrequst=async()=>{
  try{
    console.log("hey")
    const response = await adminInstance.get(`/wallet/pay`);
    console.log('data here,bjh')
    console.log(response.data)
    return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}

export const pyoutpayment=async(transactionId:string,doctorid:string)=>{
  try{  
    const response = await adminInstance.post(`/wallet/pay`,{transactionId,doctorid});
    console.log('data here')
    console.log(response.data)
    return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}


export const handlerefundforuser=async(transactionId:string)=>{
   try{  
    const response = await adminInstance.post(`/wallet/refund`,{transactionId});

    return response.data;
  }
  catch(error)
  {
      if(axios.isAxiosError(error)) {
      console.log(error.response?.data?.message);
      return error.response?.data?.message || error.message;
    }
  }
}