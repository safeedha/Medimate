import axios from "axios";
import axiosInstance from "../instances";

export const getAlldoctors = async (page: number, limit: number, singledepartment: string, search: string,experience:number|undefined) => {
  try {
    const response = await axiosInstance.get("/user/doctors", {
      params: {
        department: singledepartment,
        experience,
        search,
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
};

export const getAlldoctorsbysort = async (search: string) => {
  try {
    const response = await axiosInstance.get("/user/doctors/sort", {
      params: { search }
    });
    console.log(response)
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
};

export const getDepartnment = async () => {
  try {
    const response = await axiosInstance.get("/user/department");
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
};

export const getSingledoctor = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/user/doctor/${id}`);
    console.log(response.data);
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
};

export const getSlotedoctor = async (id: string, date: Date) => {
  try {
    const response = await axiosInstance.get(`/user/doctor/slot/${id}`, {
      params: { date }
    });
    console.log(response.data);
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
};



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

type RazorpayPaymentErrorResponse = {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      order_id: string;
      payment_id: string;
    };
  };
};


export const handlePayment = (RazorpayConstructor:any, amount: number): Promise<string> => {
  return new Promise((resolve) => {
    (async () => {
      try {
        const RAZORPAY_KEY_ID = "rzp_test_RmHsQLbeIzESnC";

        const response = await axiosInstance.post("/user/bookappoinment", {
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
              const verifyResponse = await axiosInstance.post("/user/verify-payment", {
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

        rzpay.on("payment.failed", (response:RazorpayPaymentErrorResponse ) => {
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