import { BiSolidEdit } from "react-icons/bi";

const EditBtn = ({ type, ariaLabel, onClick }) => {
  return (
    <button
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
      className="edit-btn"
      title="Datum ändern"
    >
      <BiSolidEdit />
    </button>
  );
};
export default EditBtn;
