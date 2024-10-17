import Book from "../models/bookModel.js";
import User from "../models/userModel.js";

// GET USER'S READING LISTS
const getReadingLists = async (req, res) => {
  try {
    const userId = req.params.userId;

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
    userId,
    listName,
    bookId,
    bookTitle,
    bookAuthors,
    bookPageCount,
    bookAverageRating,
    bookImage,
  } = req.body;

  try {
    // Check if the book exists; if not, create a new instance
    let book = await Book.findOne({ googleBookId: bookId });

    if (!book) {
      book = new Book({
        googleBookId: bookId,
        title: bookTitle || "-",
        author: bookAuthors || "-",
        pageCount: bookPageCount || null,
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

    // Check if the book already exists in the specified list
    const bookInCurrentList = user.readingLists[listName].some(
      (item) => item.book.toString() === book._id.toString()
    );

    // If the book is already in the selected list
    if (bookInCurrentList) {
      return res
        .status(400)
        .json({ message: "Das Buch ist bereits in der Liste." });
    }

    // If the book is not in the current list, proceed to add it
    user.readingLists[listName].push({ book: book._id });

    // Filter out the other lists
    const otherListNames = ["tbr", "reading", "read"].filter(
      (name) => name !== listName
    );

    // Remove the book from other lists
    for (const otherListName of otherListNames) {
      user.readingLists[otherListName] = user.readingLists[
        otherListName
      ].filter((item) => item.book.toString() !== book._id.toString());
    }

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
  const { userId } = req.params;
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

export { getReadingLists, addOrUpdateBookToList, removeBookFromList };
