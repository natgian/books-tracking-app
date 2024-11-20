import express from "express";
const router = express.Router();
import {
  addOrUpdateBookToList,
  removeBookFromList,
  updateReadingProgress,
  updateBookStatusToFinished,
  updateBookDate,
} from "../controllers/readingListsController.js";

// ADD OR UPDATE A BOOK IN USER LIST
router.post("/books", addOrUpdateBookToList);

// UPDATE READING PROGRESS OF A BOOK
router.put("/books/progress", updateReadingProgress);

// UPDATE BOOK STATUS TO FINISHED READING
router.put("/books/finished", updateBookStatusToFinished);

// UPDATE ADDED/FINISHED BOOK DATE
router.put("/books/date", updateBookDate);

// REMOVE A BOOK FROM USER'S BOOK LIST
router.delete("/books/:bookId", removeBookFromList);

export default router;
