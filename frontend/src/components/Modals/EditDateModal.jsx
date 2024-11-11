import "./Modal.css";
import { useRef, useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Button } from "../../components";
import { CgClose } from "react-icons/cg";
import { useUpdateDate } from "../../hooks/useUpdateDate";

const EditDateModal = ({
  isOpen,
  onClose,
  currentList,
  bookId,
  bookEntryId,
  currentDate,
  dateType,
}) => {
  const { user } = useAuthContext();
  const modalRef = useRef(null);
  const { updateDateMutation } = useUpdateDate();
  const [newDate, setNewDate] = useState(currentDate);
  const formattedCurrentDate = currentDate
    ? new Date(currentDate).toISOString().split("T")[0]
    : ""; // Use empty string as fallback if currentDate is invalid or undefined

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

  const handleInputChange = (event) => {
    const dateOnlyString = event.target.value;
    // Convert to a DAte object an dthe to an ISO string
    const isoDateString = new Date(dateOnlyString).toISOString();
    setNewDate(isoDateString);
  };

  const handleSaveDate = () => {
    updateDateMutation.mutate({
      userId: user._id,
      bookEntryId,
      listType: currentList,
      dateType,
      newDate,
    });
    onClose();
  };

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
        <label>{`${
          dateType === "addedToListAt" ? "Hinzugefügt" : "Zu Ende gelesen"
        } Datum ändern auf:`}</label>
        <input
          type="date"
          name="date"
          defaultValue={formattedCurrentDate}
          onChange={handleInputChange}
        />
        <Button
          text="Änderung speichern"
          block={false}
          type="submit"
          onClick={handleSaveDate}
        />
      </div>
    </dialog>
  );
};
export default EditDateModal;
