import "./Book.css";
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

  const imageURL = getBestImage(book.volumeInfo.imageLinks);

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
        <SelectedReadingOption
          bookId={book.id}
          bookTitle={book.volumeInfo.title}
          bookAuthors={book.volumeInfo.authors}
          bookPageCount={book.volumeInfo.pageCount}
          bookAverageRating={book.volumeInfo.averageRating}
          bookImage={secureImageURL(imageURL)}
          isBlock={true}
        />
      </div>

      <BookDetails
        title={book.volumeInfo.title}
        authors={book.volumeInfo.authors}
        categories={book.volumeInfo.categories}
        description={book.volumeInfo.description}
        isbn={book.volumeInfo.industryIdentifiers}
        publisher={book.volumeInfo.publisher}
        publishedDate={book.volumeInfo.publishedDate}
        pageCount={book.volumeInfo.pageCount}
        language={book.volumeInfo.language}
        averageRating={book.volumeInfo.averageRating}
        ratingsCount={book.volumeInfo.ratingsCount}
      />
    </section>
  );
};
export default Book;
