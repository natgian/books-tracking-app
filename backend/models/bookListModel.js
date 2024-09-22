import mongoose from "mongoose";

const bookListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    listName: {
      type: String,
      required: true,
    },
    books: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        currentPage: {
          type: Number,
          default: 0,
        },
        userRating: {
          type: Number,
          min: 1,
          max: 5,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
        finishedAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const BookList = mongoose.model("BookList", bookListSchema);

export default BookList;
