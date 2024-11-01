import "../Form/Form.css";

const FormInput = ({ id, label, name, type, autocomplete, placeholder }) => {
  return (
    <div className="form-control">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autocomplete}
        placeholder={placeholder}
        className="form-input"
        required
      />
    </div>
  );
};
export default FormInput;
