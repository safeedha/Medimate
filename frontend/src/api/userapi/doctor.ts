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
export const  getSlotedoctor=async(id:string,date:Date,toast)=>{
  try {
    const response = await userInstance.get(`/doctor/slot/${id}`, {
      params: { date: date }
    });
    console.log(response.data)
    return response.data; 
  } catch (error) {
    console.log(error);
  }
}


// export const handlePayment = async (Razorpay:any,amount:number,toast:any ):Promise<any> => {
//   try {
//     const RAZORPAY_KEY_ID = "rzp_test_RmHsQLbeIzESnC";
//     console.log(amount)
//     const response = await userInstance.post("/bookappoinment", {
//       amount: amount * 100,
//     });

//     const order = response.data;

//     const options = {
//       key: RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Medimate",
//       description: "Payment for your booking",
//       order_id: order.id,
//       handler: async (response:any) => {
//         try {
          
//           const verifyResponse = await userInstance.post("verify-payment", {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           const verifyResult = verifyResponse.data;
//           console.log("Verify Response Status:", verifyResponse.status);
//           console.log("Verify Response Body:", verifyResult);
//           // return verifyResult.message; 
//           if (verifyResult.message === "Payment verified successfully") {
            
//             alert("Payment successful and verified!");
           
//           } else {
//             toast.error("Payment verification failed!");
            
//           }
//         } catch (err) {
//           console.error("Error verifying payment:", err);
//           toast.error("Payment verification failed!");
//         }
//       },
//       prefill: {
//         name: "John Doe",
//         email: "john@example.com",
//         contact: "9999999999",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     // Step 3: Instantiate Razorpay
//     const rzpay = new Razorpay(options);

//     // Step 4: Handle payment failure
//     rzpay.on('payment.failed', async (response:any) => {
//       try {

//         toast.error(`Payment failed: ${response.error.description}`);
//       } catch (error) {
//         console.error("Error updating payment status:", error);
//       }
//     });

//     rzpay.open();
//   } catch (err) {
//     console.error("Error creating order:", err);

//   }
// };


export const handlePayment = async (Razorpay: any, amount: number): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    try {
      const RAZORPAY_KEY_ID = "rzp_test_RmHsQLbeIzESnC";

      const response = await userInstance.post("/bookappoinment", {
        amount: amount * 100,
      });

      const order = response.data;

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Medimate",
        description: "Payment for your booking",
        order_id: order.id,
        handler: async (response: any) => {
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

      const rzpay = new Razorpay(options);

      rzpay.on('payment.failed', function (response: any) {
        console.error("Payment failed:", response.error.description);
        resolve("failed");
      });

      rzpay.open();
    } catch (err) {
      console.error("Error creating order:", err);
      resolve("failed");
    }
  });
};

