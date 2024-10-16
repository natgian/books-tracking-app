import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    googleBookId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
    },
    author: [
      {
        type: String,
      },
    ],
    pageCount: {
      type: Number,
    },
    imageURL: {
      type: String,
    },
    googleAverageRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
