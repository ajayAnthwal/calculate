import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.DATABASE_URI);
    isConnected = true;
    console.log("db connected");
  } catch (error) {
    console.log("Error while connecting to mongodb", error);
    throw error;
  }
}
