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
    isbn: {
      type: String,
    },
    categories: [
      {
        type: String,
      },
    ],
    publisher: {
      type: String,
    },
    publishedDate: {
      type: String,
    },
    pageCount: {
      type: Number,
    },
    language: {
      type: String,
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
