import Book from "../models/bookModel.js";
import User from "../models/userModel.js";

// GET USER'S READING LISTS
const getReadingLists = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId)
      .populate("readingLists.read.book")
      .populate("readingLists.tbr.book")
      .populate("readingLists.reading.book");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user.readingLists);
  } catch (error) {
    console.error("Error fetching reading lists:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// ADD OR UPDATE A BOOK IN USER'S BOOK LIST
const addOrUpdateBookToList = async (req, res) => {
  const {
    listName,
    bookId,
    bookTitle,
    bookAuthors,
    bookISBN,
    bookCategories,
    bookPublisher,
    bookPublishedDate,
    bookPageCount,
    bookLanguage,
    bookAverageRating,
    bookImage,
  } = req.body;
  const userId = req.user._id;

  try {
    // Check if the book exists; if not, create a new instance
    let book = await Book.findOne({ googleBookId: bookId });

    if (!book) {
      book = new Book({
        googleBookId: bookId,
        title: bookTitle || "-",
        author: bookAuthors || "-",
        isbn: bookISBN || "-",
        categories: bookCategories || "-",
        publisher: bookPublisher || "-",
        publishedDate: bookPublishedDate || "-",
        pageCount: bookPageCount || null,
        language: bookLanguage || "-",
        imageURL: bookImage || "",
        googleAverageRating: bookAverageRating || null,
      });

      await book.save();
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    const currentListNames = ["tbr", "reading", "read"];
    const currentList = user.readingLists[listName];

    // Function to check if the book is already in the current list
    const isBookInCurrentList = () => {
      return currentList.some(
        (item) => item.book.toString() === book._id.toString()
      );
    };

    // Remove the book from other lists if it's being moved
    currentListNames.forEach((otherListName) => {
      if (otherListName !== listName) {
        user.readingLists[otherListName] = user.readingLists[
          otherListName
        ].filter((item) => item.book.toString() !== book._id.toString());
      }
    });

    // If the book is already in the current list
    if (isBookInCurrentList()) {
      return res
        .status(400)
        .json({ message: "Das Buch ist bereits in der Liste." });
    }

    // Prepare the new book entry
    const newBookEntry = { book: book._id };

    // If adding to the "read" list, set currentPage and finishedReadingAt
    if (listName === "read") {
      newBookEntry.currentPage = bookPageCount; // Set currentPage to pageCount
      newBookEntry.finishedReadingAt = new Date(); // Set the date when finished
    }

    // Add the new book entry to the current list
    currentList.push(newBookEntry);

    // Save changes to the user
    await user.save();

    return res.status(200).json({
      message: "Das Buch wurde erfolgreich zur Liste hinzugefügt",
      book,
    });
  } catch (error) {
    console.error("An error while trying to add a book:", error);
    res
      .status(500)
      .json({ message: "Error - Etwas ist schiefgelaufen", error });
  }
};

// REMOVE A BOOK FROM A USER'S BOOK LIST
const removeBookFromList = async (req, res) => {
  const userId = req.user._id;
  const googleBookId = req.params.bookId;

  try {
    // Find the book by Google Books ID
    const book = await Book.findOne({ googleBookId: googleBookId });

    if (!book) {
      return res.status(404).json({ message: "Buch nicht gefunden." });
    }

    // Extracting the ObjectId of the book
    const bookId = book._id;

    const result = await User.findByIdAndUpdate(
      userId,
      {
        $pull: {
          // Remove the book from each reading list if it exists
          "readingLists.reading": { book: bookId },
          "readingLists.tbr": { book: bookId },
          "readingLists.read": { book: bookId },
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!result) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    return res.status(200).json({
      message: "Das Buch wurde erfolgreich aus der Leseliste entfernt.",
    });
  } catch (error) {
    console.error("Error removing book from list:", error);
    res.status(500).json({
      error:
        "Beim Entfernen des Buches aus der Leseliste ist ein Fehler aufgetreten.",
    });
  }

  res.status(200).json({ message: "Book successfully removed" });
};

// UPDATE READING PROGRESS OF A BOOK
const updateReadingProgress = async (req, res) => {
  const { userId, bookEntryId, currentPage } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        "readingLists.reading._id": bookEntryId,
      },
      {
        $set: {
          "readingLists.reading.$.currentPage": currentPage,
        },
      },
      { new: true }
    );

    if (!user) {
      return res
        .status(404)
        .json({ message: "Benutzer oder Buch nicht gefunden." });
    }

    return res.status(200).json({ message: "Fortschritt gespeichert.", user });
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error });
  }
};

// UPDATE BOOK TO FINISHED READING
const updateBookStatusToFinished = async (req, res) => {
  const { userId, bookEntryId } = req.body;

  try {
    // Find the user and update the specific book entry in "reading"
    const user = await User.findOne({
      _id: userId,
      "readingLists.reading._id": bookEntryId,
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "Benutzer oder Buch nicht gefunden." });
    }

    // Find the book entry in the "reading" list
    const bookEntry = user.readingLists.reading.id(bookEntryId);

    // Set currentPage to pageCount and add finishedReadingAt only once here
    bookEntry.currentPage = bookEntry.book.pageCount;
    bookEntry.finishedReadingAt = new Date();

    // Move the book entry from "reading" to "read"
    user.readingLists.read.push(bookEntry.toObject());

    // Remove the book entry from "reading"
    user.readingLists.reading.pull(bookEntryId); // Use pull instead of remove

    // Save changes
    await user.save();

    return res.status(200).json({
      message: "Buch wurde als 'gelesen' markiert.",
      readingLists: user.readingLists,
    });
  } catch (error) {
    console.error("Error marking book as finished:", error);
    res.status(500).json({
      message: "Fehler beim markieren des Buches als 'gelesen'.",
      error,
    });
  }
};

export {
  getReadingLists,
  addOrUpdateBookToList,
  removeBookFromList,
  updateReadingProgress,
  updateBookStatusToFinished,
};
