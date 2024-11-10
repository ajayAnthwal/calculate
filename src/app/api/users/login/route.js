import { connectToDatabase } from "@/lib/dbConnect";
import  Admin from "@/models/AdminUser";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';


export async function POST(req, res) {
  try {
    await connectToDatabase();

    const { email, password } = await req.json();
    console.log(email, password);
    
    // Check if all fields are sent
    if (!email || !password) {
      return NextResponse.json({
        error: true,
        message: "All required input fields have not been filled",
      }, {status: 400});
    }

    // Check if user exist in DB
    const user = await Admin.findOne({ email });
    if (!user) {
      return NextResponse.json({
        error: true,
        message: "Incorect Credential!",
      },{status: 400});
    }

    // Check if password correct
    const isMatch = await bcrypt.compare(password, user?.password);
    if (!isMatch) {
      return NextResponse.json({
        error: true,
        message: "Incorect Credential!",
      }, {status: 400});
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user?._id, email }, process.env.JWT_SECRET);
    return NextResponse.json({
      token,
      message: "Login successful",
    }, {status: 200});
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      message: "Error",
    },{status: 500});
  }
}
