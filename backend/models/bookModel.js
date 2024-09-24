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
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    pageCount: {
      type: Number,
    },
    imageURL: {
      type: String,
    },
    GoogleAverageRating: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
