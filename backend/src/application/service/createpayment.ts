import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEYID as string,
  key_secret: process.env.KEYSECRET as string,
});

export async function createPayment(amount: number) {
  const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'receipt_' + Math.random().toString(36).substring(7),
  };
  
  const order = await razorpay.orders.create(options);
     
  return order;
}
