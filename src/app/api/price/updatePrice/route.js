import { connectToDatabase } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import Admin from "@/models/AdminUser";
import { verifyToken } from "@/utils/userValidation";
import BookPrice from "@/models/BookPrice";

export async function POST(req) {
  try {
    connectToDatabase();

    // Verify token user
    const token = req.headers.get("Authorization")?.split(" ")[1]; // Get token from "Authorization" header
    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 403 });
    }

    const user = verifyToken(token);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 403 }
      );
    }

    const { bookPrice } = await req.json();
    // Check if all fields are sent
    if (!bookPrice) {
      return NextResponse.json(
        {
          error: true,
          message: "All required input fields have not been filled",
        },
        { status: 400 }
      );
    }

    await BookPrice.deleteMany();

    const book = new BookPrice({ bookPrice });
    await book.save();
    return NextResponse.json(
      { error: false, message: "book created successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: true,
      status: 500,
      message: "Error",
    });
  }
}
