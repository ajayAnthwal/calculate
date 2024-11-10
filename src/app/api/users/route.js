import { connectToDatabase } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import  User from "@/models/AdminUser";

export async function GET() {
    connectToDatabase();
    // const users = [{ id: 1, name: "Gaurav", email: "myname@gmail.com" }];
    const users = await User.find()
  
    return NextResponse.json({ users });
  }
  