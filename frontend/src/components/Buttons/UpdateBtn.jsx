import "../../index.css";

const UpdateBtn = ({ text, block, onClick }) => {
  return (
    <button
      type="button"
      className={`update-btn ${block ? "btn-block" : ""}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default UpdateBtn;
