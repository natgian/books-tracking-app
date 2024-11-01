import "./Modal.css";
import { useRef, useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useUpdateProgress } from "../../hooks/useUpdateProgress";
import { useFinishedBook } from "../../hooks/useFinishedBook";
import { Button } from "../../components";
import { CgClose } from "react-icons/cg";

const UpdateProgressModal = ({
  bookPageCount,
  currentPage,
  bookEntryId,
  bookId,
  isOpen,
  onClose,
}) => {
  const { user } = useAuthContext();
  const { updateProgressMutation } = useUpdateProgress();
  const { finishedBookMutation } = useFinishedBook();
  const [updatedPageNumber, setUpdatedPageNumber] = useState(currentPage);
  const modalRef = useRef(null);
  const inputRef = useRef(null);

  const handleInputClick = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = (event) => {
    setUpdatedPageNumber(event.target.value);
  };

  const handleSaveProgress = () => {
    updateProgressMutation.mutate({
      userId: user._id,
      bookEntryId,
      bookId,
      currentPage: updatedPageNumber,
    });
    onClose();
  };

  const handleFinishedBook = () => {
    finishedBookMutation.mutate({
      userId: user._id,
      bookEntryId,
    });
  };

  // Use useEffect to handle the modal opening and closing when isOpen changes
  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
        document.body.style.overflow = "hidden"; // prevent background scrolling
      } else {
        modalRef.current.close();
      }
    }

    // Cleanup function to reset body overflow when modal is closed
    return () => {
      document.body.style.overflow = ""; // Reset to allow scrolling
    };
  }, [isOpen]);

  // Use useEffect to handle closing the modal when "escape" is pressed on the keyboard
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <dialog ref={modalRef} className="modal">
      {/* Close Modal Button */}
      <button
        type="button"
        className="close-btn"
        aria-label="Fenster schliessen"
        onClick={onClose}
      >
        <CgClose />
      </button>

      <div className="modal-content">
        <span>
          Derzait auf Seite
          <input
            type="number"
            name="pageNumber"
            id="pageNumber"
            min="0"
            max={bookPageCount}
            defaultValue={currentPage}
            ref={inputRef}
            onClick={handleInputClick}
            onChange={handleInputChange}
            className="pagenumber-input"
          />
          von {bookPageCount}
        </span>
        <Button
          text="Fortschritt speichern"
          block={false}
          type="submit"
          onClick={handleSaveProgress}
        />

        {/* Finished Book Button */}
        <button onClick={handleFinishedBook} className="show-more-btn mt-1">
          Ich habe das Buch zu Ende gelesen!
        </button>
      </div>
    </dialog>
  );
};
export default UpdateProgressModal;
