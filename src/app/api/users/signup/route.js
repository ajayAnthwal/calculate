import { connectToDatabase } from "@/lib/dbConnect";
import Admin from "@/models/AdminUser";
import { hashPassword } from "@/utils/userValidation";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req, res) {
  try {
    await connectToDatabase();

    const { email, password, name } = await req.json();
    console.log(email, password, name);

    // Check if all fields are sent
    if (!email || !password || !name) {
      return NextResponse.json({
        error: true,
        status: 400,
        message: "All required input fields have not been filled",
      });
    }

    // Check if user exist in DB
    const user = await Admin.findOne({ email });
    if (user) {
      return NextResponse.json({
        error: true,
        status: 400,
        message: "User already exist!",
      });
    }

    const hasedPassword = await bcrypt.hash(password, 10)

    // Registering user
    const newUser = new Admin({
      email,
      password: hasedPassword,
      name,
    });

    await newUser.save();

    return NextResponse.json({
      error: false,
      status: 201,
      message: "Register susscessfull!",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      status: 500,
      message: "Error",
    });
  }
}
