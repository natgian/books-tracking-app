const Button = (props) => {
  return (
    <button
      className={`btn capitalize ${props.block ? "btn-block" : ""}`}
      type="button"
    >
      {props.text}
    </button>
  );
};
export default Button;
