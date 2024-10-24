const Button = ({ text, block, onClick, type = "button" }) => {
  return (
    <button
      className={`btn ${block ? "btn-block" : ""}`}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
export default Button;
