import Razorpay from 'razorpay';
import dotenv from 'dotenv';
dotenv.config();

const razorpay = new Razorpay({
  key_id: "rzp_test_RmHsQLbeIzESnC",
  key_secret: "toMYZYyUM0mObogBqYDzRIcU"
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
    console.error('Error creating Razorpay order:', error);
    throw new Error('Failed to create Razorpay order');
  }
}
