import "./Book.css";
import defaultCover from "../../assets/no-cover.jpg";
import { BiErrorCircle } from "react-icons/bi";
import { fetchSingleBook } from "../../api/fetchSingleBook";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { secureImageURL } from "../../utilities/secureImageURL";
import { getBestImage } from "../../utilities/getBestImage";
import BookDetails from "./BookDetails";
import { Loading, SelectedReadingOption } from "../../components";

// LOADER //
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const { id } = params;

    await queryClient.prefetchQuery({
      queryKey: ["book", id],
      queryFn: () => fetchSingleBook(id),
    });

    return queryClient.getQueryData(["book", id]);
  };

// BOOK //
const Book = () => {
  const initialData = useLoaderData();
  const { id } = initialData;

  const {
    data: book,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchSingleBook(id),
    initialData,
  });

  // Image URL for displaying best quality image
  const imageURL = getBestImage(book.volumeInfo?.imageLinks);

  // Thumbnail image URL for saving to database
  const imageThumbnailURL =
    book.volumeInfo?.imageLinks?.thumbnail || defaultCover;

  // Getting the ISBN
  const isbn =
    book.volumeInfo?.industryIdentifiers?.find(
      (identifier) => identifier.type === "ISBN_13"
    )?.identifier ?? "-";

  // LOADING STATE //
  if (isPending) {
    return (
      <section className="text-center section-container">
        <Loading />
        Wird geladen...
      </section>
    );
  }

  // ERROR STATE //
  if (isError) {
    return (
      <section className="text-center section-container">
        Etwas ist schiefgelaufen. Bitte erneut versuchen.
        <div className="error-box">
          <BiErrorCircle />
          {error.message}
        </div>
      </section>
    );
  }

  return (
    <section className="book-details section-container">
      <div className="book-cover-select-container">
        <div className="book-cover-container">
          {/* COVER */}
          <img
            src={secureImageURL(imageURL)}
            alt={book.volumeInfo.title}
            className="book-cover"
          />
        </div>
        <div className="mt-1"></div>
        <SelectedReadingOption
          bookId={book.id}
          bookTitle={book.volumeInfo?.title}
          bookAuthors={book.volumeInfo.authors}
          bookISBN={isbn}
          bookCategories={book.volumeInfo?.categories}
          bookPublisher={book.volumeInfo?.publisher}
          bookPublishedDate={book.volumeInfo?.publishedDate}
          bookPageCount={book.volumeInfo?.pageCount}
          bookLanguage={book.volumeInfo?.language}
          bookAverageRating={book.volumeInfo?.averageRating}
          bookImage={
            imageThumbnailURL === defaultCover
              ? defaultCover
              : secureImageURL(imageThumbnailURL)
          }
          isBlock={true}
        />
      </div>

      <BookDetails
        title={book.volumeInfo?.title}
        authors={book.volumeInfo?.authors}
        categories={book.volumeInfo?.categories}
        description={book.volumeInfo?.description}
        isbn={isbn}
        format={book.salesInfo?.isEbook ? "E-Book" : "Druckausgabe"}
        publisher={book.volumeInfo?.publisher}
        publishedDate={book.volumeInfo?.publishedDate}
        pageCount={book.volumeInfo?.pageCount}
        language={book.volumeInfo?.language}
        averageRating={book.volumeInfo?.averageRating}
        ratingsCount={book.volumeInfo?.ratingsCount}
      />
    </section>
  );
};
export default Book;
