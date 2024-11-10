const mongoose = require("mongoose");

const BookPriceSchema = new mongoose.Schema(
  {
    bookPrice: [
      {
        bookType: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Create the BookPrice model if it doesn't already exist
export default mongoose.models.BookPrice ||
  mongoose.model("BookPrice", BookPriceSchema);
