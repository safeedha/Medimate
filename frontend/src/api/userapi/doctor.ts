import userInstance from "./instance";
import axios from "axios";

export const getAlldoctors = async (page:number,limit:number,singledepartment:string,search:string) => {
  try {
   const response = await userInstance.get("/doctors", {
    params: {
      department: singledepartment,
      search:search,
      page,
      limit
    }
  });

    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const getAlldoctorsbysort=async(search:string)=>{
   try {
   const response = await userInstance.get("/doctors/sort", {
    params: {
      search:search,
    }
  });

    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}


export const getDepartnment = async () => {
  try {
    const response = await userInstance.get("/department");
    return response.data 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}

export const getSingledoctor = async (id:string) => {
  try {
    const response = await userInstance.get(`/doctor/${id}`);
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}
export const  getSlotedoctor=async(id:string,date:Date)=>{
  try {
    const response = await userInstance.get(`/doctor/slot/${id}`, {
      params: { date: date }
    });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      return error.message;
    } else {
      return 'Internal server error';
    }
  }
}




// export const handlePayment = async (Razorpay: any, amount: number): Promise<string> => {
//   return new Promise(async (resolve) => {
//     try {
//       const RAZORPAY_KEY_ID = "rzp_test_RmHsQLbeIzESnC";

//       const response = await userInstance.post("/bookappoinment", {
//         amount: amount * 100,
//       });

//       const order = response.data;

//       const options = {
//         key: RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Medimate",
//         description: "Payment for your booking",
//         order_id: order.id,
//         handler: async (response:any) => {
//           try {
//             const verifyResponse = await userInstance.post("verify-payment", {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             const verifyResult = verifyResponse.data;

//             if (verifyResult.message === "Payment verified successfully") {
//               resolve("success");
//             } else {
//               resolve("failed");
//             }
//           } catch (err) {
//             console.error("Verification error:", err);
//             resolve("failed");
//           }
//         },
//         prefill: {
//           name: "John Doe",
//           email: "john@example.com",
//           contact: "9999999999",
//         },
//         notes: {
//           address: "Razorpay Corporate Office",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzpay = new Razorpay(options);

//       rzpay.on('payment.failed', function (response: any) {
//         console.error("Payment failed:", response.error.description);
//         resolve("failed");
//       });

//       rzpay.open();
//     } catch (err) {
//       console.error("Error creating order:", err);
//       resolve("failed");
//     }
//   });
// };

type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayPaymentResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: {
    address: string;
  };
  theme: {
    color: string;
  };
};

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open(): void;
  on(event: string, callback: (response: { error: { description: string } }) => void): void;
}

export const handlePayment = (RazorpayConstructor: new (options: RazorpayOptions) => RazorpayInstance, amount: number): Promise<string> => {
  return new Promise((resolve) => {
    (async () => {
      try {
        const RAZORPAY_KEY_ID = "rzp_test_RmHsQLbeIzESnC";

        const response = await userInstance.post("/bookappoinment", {
          amount: amount * 100,
        });

        const order = response.data;

        const options: RazorpayOptions = {
          key: RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: "Medimate",
          description: "Payment for your booking",
          order_id: order.id,
          handler: async (response: RazorpayPaymentResponse) => {
            try {
              const verifyResponse = await userInstance.post("verify-payment", {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              const verifyResult = verifyResponse.data;

              if (verifyResult.message === "Payment verified successfully") {
                resolve("success");
              } else {
                resolve("failed");
              }
            } catch (err) {
              console.error("Verification error:", err);
              resolve("failed");
            }
          },
          prefill: {
            name: "John Doe",
            email: "john@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzpay = new RazorpayConstructor(options);

        rzpay.on("payment.failed", (response) => {
          console.error("Payment failed:", response.error.description);
          resolve("failed");
        });

        rzpay.open();
      } catch (err) {
        console.error("Error creating order:", err);
        resolve("failed");
      }
    })();
  });
};