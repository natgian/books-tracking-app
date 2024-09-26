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
      enum: ["tbr", "reading", "read"],
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
        addedToListAt: {
          type: Date,
          default: Date.now,
        },
        finishedReadingAt: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

const BookList = mongoose.model("BookList", bookListSchema);

export default BookList;
