import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import {ServiceMessage} from '../../common/serviceMessages'
dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.KEYID as string,
  key_secret: process.env.KEYSECRET as string
});

export async function createPayment(amount: number) {
  try {
    const options = {
      amount: amount,
      currency: 'INR',
      receipt: 'receipt_' + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    return order;
  } catch (error) {
    console.log(error)
    throw new Error(ServiceMessage.ORDER_CREATION_FAILED);
  }
}
