import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEYID as string,
  key_secret: process.env.KEYSECRET as string,
});

export async function verifypayment( razorpay_order_id:string, razorpay_payment_id:string, razorpay_signature:string):Promise<{message:string}> {
    try{
   const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto.createHmac('sha256', 'toMYZYyUM0mObogBqYDzRIcU')
                            .update(sign.toString())
                            .digest('hex');

    if (razorpay_signature === expectedSign) {
       return { message: "Payment verified successfully" };
    }
    else {
      throw new Error("Payment verification failed");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Payment verification failed");
  }
}
