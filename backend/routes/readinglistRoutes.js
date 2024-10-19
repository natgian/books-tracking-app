import express from "express";
const router = express.Router();
import {
  addOrUpdateBookToList,
  removeBookFromList,
  getReadingLists,
} from "../controllers/readingListsController.js";

// GET ALL USER'S BOOK LISTS
router.get("/books", getReadingLists);

// ADD OR UPDATE A BOOK IN USER LIST
router.post("/books", addOrUpdateBookToList);

// REMOVE A BOOK FROM USER'S BOOK LIST
router.delete("/books/:bookId", removeBookFromList);

export default router;
