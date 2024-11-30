import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// SCHEMA TO STORE USER-SPECIFIC DATA FOR EACH BOOK
const userBookDataSchema = new mongoose.Schema({
  book: {
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
    default: null,
  },
  addedToListAt: {
    type: Date,
    default: Date.now,
  },
  finishedReadingAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

// SCHEMA FOR THE BOOK LISTS (tbr, reading, read)
const readingListsSchema = new mongoose.Schema({
  reading: [userBookDataSchema],
  tbr: [userBookDataSchema],
  read: [userBookDataSchema],
});

// SCHEMA TO STORE INDIVIDUAL READING GOALS FOR EACH YEAR
const readingGoalSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  goal: {
    type: Number,
    default: 0,
  },
  progress: {
    type: Number,
    default: 0,
  },
});

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
    readingLists: {
      type: readingListsSchema,
      default: () => ({
        reading: [],
        tbr: [],
        read: [],
      }),
    },
    readingGoals: [readingGoalSchema],
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const User = mongoose.model("User", userSchema);

export default User;
