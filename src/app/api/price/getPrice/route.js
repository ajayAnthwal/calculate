import { connectToDatabase } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import User from "@/models/AdminUser";
import BookPrice from "@/models/BookPrice";

export async function GET() {
  try {
    connectToDatabase();
    const books = await BookPrice.find();

    return NextResponse.json(books);
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      status: 500,
      message: "Error",
    });
  }
}
