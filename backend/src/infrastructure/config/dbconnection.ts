import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const MONGO_URL = process.env.MONGO_URL!
console.log(MONGO_URL)

export async function connectToDatabase() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Database connection successful');
  } catch (error) {
   console.log(error)
  }
}