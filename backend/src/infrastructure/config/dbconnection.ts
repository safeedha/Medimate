import mongoose from 'mongoose';

export async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Appinment');
    console.log('Database connection successful');
  } catch (error) {
   
  }
}